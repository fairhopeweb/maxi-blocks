/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Imports
 */
import * as attributesData from '../../extensions/styles/defaults/index';

/**
 * Attributes
 */
const attributes = {
	...attributesData.global,
	customLabel: {
		type: 'string',
		default: __('Column', 'maxi-blocks'),
	},
	fullWidth: {
		type: 'string',
		default: 'normal',
	},
	verticalAlign: {
		type: 'string',
		default: 'stretch',
	},
	extraClassName: {
		type: 'string',
		default: '',
	},
	extraStyles: {
		type: 'string',
		default: '',
	},
	...attributesData.palette,
	...attributesData.columnSize,
	...attributesData.opacity,
	...attributesData.palette.background,
	...attributesData.palette.border,
	...attributesData.palette.boxShadow,
	...attributesData.backgroundColor,
	...attributesData.backgroundImage,
	...attributesData.backgroundVideo,
	...attributesData.backgroundGradient,
	...attributesData.backgroundSVG,
	...attributesData.backgroundHover,
	...attributesData.backgroundColorHover,
	...attributesData.backgroundImageHover,
	...attributesData.backgroundVideoHover,
	...attributesData.backgroundGradientHover,
	...attributesData.backgroundSVGHover,
	...attributesData.border,
	...attributesData.borderWidth,
	...attributesData.borderRadius,
	...attributesData.borderHover,
	...attributesData.boxShadow,
	...attributesData.boxShadowHover,
	...attributesData.margin,
	...attributesData.padding,
	...attributesData.display,
	...attributesData.transform,
	...attributesData.zIndex,
};

export default attributes;
