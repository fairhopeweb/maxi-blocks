/**
 * Internal dependencies
 */
import * as attributesData from '../../extensions/styles/defaults/index';
import {
	prefixAttributesCreator,
	transitionAttributesCreator,
} from '../../extensions/styles';
import { transition } from './data';

const mutualAttributes = {
	...attributesData.background,
	...attributesData.backgroundColor,
	...attributesData.backgroundGradient,

	...attributesData.backgroundHover,
	...attributesData.backgroundColorHover,
	...attributesData.backgroundGradientHover,

	...attributesData.border,
	...attributesData.borderHover,
	...attributesData.borderRadius,
	...attributesData.borderWidth,
	...attributesData.boxShadow,
	...attributesData.boxShadowHover,
	...attributesData.size,
	...attributesData.padding,
};

/**
 * Attributes
 */
const attributes = {
	...attributesData.global,

	/**
	 * Block styles
	 */
	title: { type: 'string' },
	accordionLayout: { type: 'string' },
	titleLevel: { type: 'string', default: 'h6' },

	...attributesData.blockBackground,
	...attributesData.border,
	...attributesData.borderHover,
	...attributesData.borderRadius,
	...attributesData.borderWidth,
	...attributesData.boxShadow,
	...attributesData.boxShadowHover,
	...attributesData.size,
	...attributesData.margin,
	...{
		...attributesData.padding,
		'padding-top-general': {
			type: 'string',
			default: '25',
		},
		'padding-bottom-general': {
			type: 'string',
			default: '25',
		},
		'padding-left-general': {
			type: 'string',
			default: '25',
		},
		'padding-right-general': {
			type: 'string',
			default: '25',
		},
	},

	/**
	 * Header
	 */
	...prefixAttributesCreator({
		obj: mutualAttributes,
		prefix: 'header-',
	}),

	/**
	 * Content
	 */
	...prefixAttributesCreator({
		obj: {
			...mutualAttributes,
			'padding-top-general': {
				type: 'string',
				default: '25',
			},
			'padding-bottom-general': {
				type: 'string',
				default: '25',
			},
			'padding-sync-general': {
				type: 'string',
				default: 'axis',
			},
		},
		prefix: 'content-',
	}),

	/**
	 * Advanced
	 */
	...attributesData.scroll,
	...attributesData.transform,
	...{
		...attributesData.transition,
		...transitionAttributesCreator(transition),
	},
	...attributesData.display,
	...attributesData.position,
	...attributesData.overflow,
	...attributesData.zIndex,
	...attributesData.customCss,
	...attributesData.flex,
};

export default attributes;
