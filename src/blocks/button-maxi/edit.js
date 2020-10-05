/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { __experimentalBlock, RichText } = wp.blockEditor;

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import {
	getColorBackgroundObject,
	getBoxShadowObject,
	getAlignmentFlexObject,
	getTransformObject,
	getAlignmentTextObject,
} from '../../utils';
import { MaxiBlock, __experimentalToolbar } from '../../components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil } from 'lodash';

/**
 * Content
 */
class edit extends MaxiBlock {
	get getObject() {
		const response = {
			[this.props.attributes.uniqueID]: this.getWrapperObject,
			[`${this.props.attributes.uniqueID} .maxi-button-extra__button`]: this
				.getNormalObject,
			[`${this.props.attributes.uniqueID} .maxi-button-extra__button:hover`]: this
				.getHoverObject,
		};

		return response;
	}

	get getWrapperObject() {
		const { alignment, zIndex, transform } = this.props.attributes;

		const response = {
			alignment: { ...getAlignmentFlexObject(JSON.parse(alignment)) },
			zIndex: { ...JSON.parse(zIndex) },
			transform: { ...getTransformObject(JSON.parse(transform)) },
		};

		return response;
	}

	get getNormalObject() {
		const {
			background,
			alignmentText,
			typography,
			boxShadow,
			border,
			size,
			padding,
			margin,
			zIndex,
			position,
			display,
		} = this.props.attributes;

		const response = {
			typography: { ...JSON.parse(typography) },
			alignmentText: {
				...getAlignmentTextObject(JSON.parse(alignmentText)),
			},
			background: { ...getColorBackgroundObject(JSON.parse(background)) },
			boxShadow: { ...getBoxShadowObject(JSON.parse(boxShadow)) },
			border: { ...JSON.parse(border) },
			borderWidth: { ...JSON.parse(border).borderWidth },
			borderRadius: { ...JSON.parse(border).borderRadius },
			size: { ...JSON.parse(size) },
			padding: { ...JSON.parse(padding) },
			margin: { ...JSON.parse(margin) },
			zIndex: { ...JSON.parse(zIndex) },
			position: { ...JSON.parse(position) },
			positionOptions: { ...JSON.parse(position).options },
			display: { ...JSON.parse(display) },
		};

		return response;
	}

	get getHoverObject() {
		const {
			backgroundHover,
			typographyHover,
			boxShadowHover,
			borderHover,
		} = this.props.attributes;

		const response = {
			typographyHover: { ...JSON.parse(typographyHover) },
			boxShadowHover: {
				...getBoxShadowObject(JSON.parse(boxShadowHover)),
			},
			borderHover: { ...JSON.parse(borderHover) },
			borderWidth: { ...JSON.parse(borderHover).borderWidth },
			borderRadius: { ...JSON.parse(borderHover).borderRadius },
		};

		if (!isNil(backgroundHover) && !!JSON.parse(backgroundHover).status) {
			response['backgroundHover'] = {
				...getColorBackgroundObject(JSON.parse(backgroundHover)),
			};
		}

		return response;
	}

	render() {
		const {
			className,
			attributes: {
				uniqueID,
				blockStyle,
				defaultBlockStyle,
				extraClassName,
				buttonText,
			},
			setAttributes,
		} = this.props;

		const classes = classnames(
			'maxi-block maxi-button-extra',
			blockStyle,
			extraClassName,
			uniqueID,
			className
		);

		return [
			<Inspector {...this.props} />,
			<__experimentalToolbar {...this.props} />,
			<__experimentalBlock
				className={classes}
				data-maxi_initial_block_class={defaultBlockStyle}
			>
				<RichText
					className='maxi-button-extra__button'
					withoutInteractiveFormatting
					placeholder={__('Set some text…', 'maxi-blocks')}
					value={buttonText}
					onChange={buttonText => setAttributes({ buttonText })}
					identifier='text'
				/>
			</__experimentalBlock>,
		];
	}
}

export default edit;
