/**
 * WordPress dependencies
 */
const { __experimentalBlock } = wp.blockEditor;
const { createRef } = wp.element;
const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import {
	BackgroundDisplayer,
	BlockResizer,
	MaxiBlock,
	MotionPreview,
	Toolbar,
} from '../../components';
import {
	getGroupAttributes,
	getLastBreakpointAttribute,
} from '../../extensions/styles';
import getStyles from './styles';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil, isEmpty } from 'lodash';

/**
 * Content
 */
class edit extends MaxiBlock {
	constructor(props) {
		super(props);
		this.resizableObject = createRef();
	}

	get getStylesObject() {
		return getStyles(this.props.attributes);
	}

	get getCustomData() {
		const { uniqueID } = this.props.attributes;

		const motionStatus =
			!!this.props.attributes['motion-status'] ||
			!isEmpty(this.props.attributes['entrance-type']);

		return {
			[uniqueID]: {
				...(motionStatus && {
					...getGroupAttributes(this.props.attributes, [
						'motion',
						'entrance',
					]),
				}),
			},
		};
	}

	render() {
		const {
			attributes,
			className,
			deviceType,
			isSelected,
			onDeviceTypeChange,
			setAttributes,
		} = this.props;
		const {
			uniqueID,
			blockStyle,
			defaultBlockStyle,
			blockStyleBackground,
			lineOrientation,
			extraClassName,
			fullWidth,
			background,
		} = attributes;

		onDeviceTypeChange();

		const classes = classnames(
			'maxi-block',
			'maxi-block--backend',
			'maxi-divider-block',
			getLastBreakpointAttribute('display', deviceType, attributes) ===
				'none' && 'maxi-block-display-none',
			blockStyle,
			blockStyle !== 'maxi-custom' &&
				`maxi-background--${blockStyleBackground}`,
			!!attributes['border-highlight'] && 'maxi-highlight--border',
			extraClassName,
			uniqueID,
			className,
			lineOrientation === 'vertical'
				? 'maxi-divider-block--vertical'
				: 'maxi-divider-block--horizontal'
		);

		const handleOnResizeStart = event => {
			event.preventDefault();
			setAttributes({
				[`height-unit-${deviceType}`]: 'px',
			});
		};

		const handleOnResizeStop = (event, direction, elt) => {
			setAttributes({
				[`height-${deviceType}`]: elt.getBoundingClientRect().height,
			});
		};

		return [
			<Inspector {...this.props} />,
			<Toolbar {...this.props} />,

			<BlockResizer
				resizableObject={this.resizableObject}
				className={classnames(
					'maxi-block__resizer',
					'maxi-divider-block__resizer',
					`maxi-divider-block__resizer__${uniqueID}`,
					{
						'is-selected': isSelected,
					}
				)}
				size={{
					width: '100%',
					height: `${attributes[`height-${deviceType}`]}${
						attributes[`-unit-${deviceType}`]
					}`,
				}}
				defaultSize={{
					width: '100%',
					height: `${attributes[`height-${deviceType}`]}${
						attributes[`-unit-${deviceType}`]
					}`,
				}}
				showHandle={isSelected}
				directions={{
					bottom: true,
				}}
				onResizeStart={handleOnResizeStart}
				onResizeStop={handleOnResizeStop}
			>
				<MotionPreview {...getGroupAttributes(attributes, 'motion')}>
					<__experimentalBlock
						className={classes}
						data-maxi_initial_block_class={defaultBlockStyle}
						data-align={fullWidth}
					>
						<BackgroundDisplayer background={background} />
						{attributes['divider-border-style'] !== 'none' && (
							<hr className='maxi-divider-block__divider' />
						)}
					</__experimentalBlock>
				</MotionPreview>
			</BlockResizer>,
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
		attributes: { uniqueID },
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
			node.style.height = `${
				ownProps.attributes[`height-${newDeviceType}`]
			}px`;
		}
	};

	return {
		onDeviceTypeChange,
	};
});

export default compose(editSelect, editDispatch)(edit);
