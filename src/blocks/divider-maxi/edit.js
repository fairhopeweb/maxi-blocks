/**
 * WordPress dependencies
 */
const { __experimentalBlock } = wp.blockEditor;
const { ResizableBox } = wp.components;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import {
	getBoxShadowObject,
	getTransformObject,
	setBackgroundStyles,
	getLastBreakpointValue,
} from '../../utils';
import {
	MaxiBlock,
	Toolbar,
	BackgroundDisplayer,
	MotionPreview,
} from '../../components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil } from 'lodash';

/**
 * Content
 */
class edit extends MaxiBlock {
	state = {
		isResizing: false,
		styles: {},
		breakpoints: this.getBreakpoints,
	};

	get getObject() {
		const { uniqueID, background, backgroundHover } = this.props.attributes;

		let response = {
			[uniqueID]: this.getNormalObject,
			[`${uniqueID}:hover hr.maxi-divider-block__divider`]: this
				.getHoverObject,
			[`${uniqueID} hr.maxi-divider-block__divider`]: this
				.getDividerObject,
		};

		response = Object.assign(
			response,
			setBackgroundStyles({
				target: uniqueID,
				background,
				backgroundHover,
			})
		);

		return response;
	}

	get getNormalObject() {
		const {
			lineVertical,
			lineHorizontal,
			linesAlign,
			opacity,
			size,
			padding,
			margin,
			zIndex,
			position,
			display,
			transform,
		} = this.props.attributes;

		const response = {
			size,
			padding,
			margin,
			opacity,
			zIndex,
			position,
			positionOptions: position.options,
			display,
			transform: getTransformObject(transform),
			divider: {
				label: 'Divider',
				general: {},
			},
		};

		if (!isNil(linesAlign)) {
			response.divider.general['flex-direction'] = linesAlign;
			if (linesAlign === 'row') {
				if (!isNil(lineVertical))
					response.divider.general['align-items'] = lineVertical;
				if (!isNil(lineHorizontal))
					response.divider.general[
						'justify-content'
					] = lineHorizontal;
			} else {
				if (!isNil(lineVertical))
					response.divider.general['justify-content'] = lineVertical;
				if (!isNil(lineHorizontal))
					response.divider.general['align-items'] = lineHorizontal;
			}
		}

		return response;
	}

	get getHoverObject() {
		const { boxShadowHover } = this.props.attributes;

		const response = {};

		if (!isNil(boxShadowHover) && !!boxShadowHover.status) {
			response.boxShadowHover = {
				...getBoxShadowObject(boxShadowHover),
			};
		}

		return response;
	}

	get getDividerObject() {
		const { divider, boxShadow } = this.props.attributes;
		const response = {
			boxShadow: { ...getBoxShadowObject(boxShadow) },
			divider: { ...divider },
			opacity: { ...divider.opacity },
		};

		return response;
	}

	get getCustomData() {
		const { uniqueID, motion } = this.props.attributes;

		const motionStatus =
			!!motion.interaction.interactionStatus || !!motion.parallax.status;

		return {
			[uniqueID]: {
				...(motionStatus && { motion }),
			},
		};
	}

	render() {
		const {
			attributes: {
				uniqueID,
				blockStyle,
				defaultBlockStyle,
				blockStyleBackground,
				lineOrientation,
				extraClassName,
				fullWidth,
				background,
				motion,
			},
			className,
			isSelected,
			deviceType,
			onDeviceTypeChange,
			setAttributes,
		} = this.props;
		const size = { ...this.props.attributes.size };
		const display = { ...this.props.attributes.display };
		const highlightValue = { ...this.props.attributes.highlight };
		const divider = { ...this.props.attributes.divider };
		const { isResizing } = this.state;

		onDeviceTypeChange();

		const classes = classnames(
			'maxi-block',
			'maxi-block--backend',
			'maxi-divider-block',
			getLastBreakpointValue(display, 'display', deviceType) === 'none' &&
				'maxi-block-display-none',
			blockStyle,
			blockStyle !== 'maxi-custom' &&
				`maxi-background--${blockStyleBackground}`,
			!!highlightValue.borderHighlight && 'maxi-highlight--border',
			extraClassName,
			uniqueID,
			className,
			lineOrientation === 'vertical'
				? 'maxi-divider-block--vertical'
				: 'maxi-divider-block--horizontal'
		);

		const handleOnResizeStart = event => {
			event.preventDefault();
			size[deviceType].heightUnit !== 'px' &&
				(size[deviceType].heightUnit = 'px') &&
				setAttributes({
					size,
				});
			this.setState({ isResizing: true });
		};

		const handleOnResizeStop = (event, direction, elt) => {
			size[deviceType].height = elt.getBoundingClientRect().height;
			setAttributes({
				size,
			});
			this.setState({ isResizing: false });
		};

		return [
			<Inspector {...this.props} />,
			<Toolbar {...this.props} />,
			<ResizableBox
				size={{
					width: '100%',
					height:
						size[deviceType].height + size[deviceType].heightUnit,
				}}
				className={classnames(
					'maxi-block__resizer',
					'maxi-divider-block__resizer',
					`maxi-divider-block__resizer__${uniqueID}`,
					{
						'is-selected': isSelected,
					}
				)}
				defaultSize={{
					width: '100%',
					height:
						size[deviceType].height + size[deviceType].heightUnit,
				}}
				enable={{
					top: false,
					right: false,
					bottom: true,
					left: false,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false,
				}}
				onResizeStart={handleOnResizeStart}
				onResizeStop={handleOnResizeStop}
				showHandle={isSelected}
				__experimentalShowTooltip
				__experimentalTooltipProps={{
					axis: 'y',
					position: 'bottom',
					isVisible: isResizing,
				}}
			>
				<MotionPreview motion={motion}>
					<__experimentalBlock
						className={classes}
						data-maxi_initial_block_class={defaultBlockStyle}
						data-align={fullWidth}
					>
						<BackgroundDisplayer background={background} />
						{divider.general['border-style'] !== 'none' && (
							<hr className='maxi-divider-block__divider' />
						)}
					</__experimentalBlock>
				</MotionPreview>
			</ResizableBox>,
		];
	}
}

const editSelect = withSelect(select => {
	const deviceType = select('maxiBlocks').receiveMaxiDeviceType();

	return {
		deviceType,
	};
});

const editDispatch = withDispatch((dispatch, ownProps, { select }) => {
	const {
		attributes: { uniqueID, size },
		deviceType,
	} = ownProps;

	const onDeviceTypeChange = () => {
		let newDeviceType = select('maxiBlocks').receiveMaxiDeviceType();
		newDeviceType = newDeviceType === 'Desktop' ? 'general' : newDeviceType;

		const allowedDeviceTypes = ['general', 'xl', 'l', 'm', 's'];

		if (
			allowedDeviceTypes.includes(newDeviceType) &&
			deviceType !== newDeviceType
		) {
			const node = document.querySelector(
				`.maxi-divider-block__resizer__${uniqueID}`
			);
			if (isNil(node)) return;
			node.style.height = `${size[newDeviceType].height}px`;
		}
	};

	return {
		onDeviceTypeChange,
	};
});

export default compose(editSelect, editDispatch)(edit);
