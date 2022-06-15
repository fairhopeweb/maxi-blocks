/**
 * Internal dependencies
 */
import getColorRGBAString from '../getColorRGBAString';
import getPaletteAttributes from '../getPaletteAttributes';
import getMarginPaddingStyles from './getMarginPaddingStyles';
import getGroupAttributes from '../getGroupAttributes';

/**
 * External dependencies
 */
import { isNil } from 'lodash';

/**
 * General
 */
const breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

export const getShapeDividerStyles = (obj, location) => {
	const response = {
		label: 'Shape Divider',
	};

	breakpoints.forEach(breakpoint => {
		response[breakpoint] = {};

		if (!isNil(obj[`shape-divider-${location}-height-${breakpoint}`]))
			response[breakpoint].height = `${
				obj[`shape-divider-${location}-height-${breakpoint}`]
			}${
				obj[`shape-divider-${location}-height-unit-${breakpoint}`] ??
				'px'
			}`;
		if (!isNil(obj[`shape-divider-${location}-opacity`]))
			response[breakpoint].opacity =
				obj[`shape-divider-${location}-opacity-${breakpoint}`];
	});

	const rawPositions = getMarginPaddingStyles({
		obj: {
			...getGroupAttributes(obj, 'padding'),
		},
	});

	Object.entries(rawPositions).forEach(([breakpoint, value]) => {
		const result = {};

		Object.entries(value).forEach(([pos, val]) => {
			result[pos.replace('padding-', '')] = `${
				location === 'top' ? '-' : ''
			}${val}`;
		});

		response[breakpoint] = { ...response[breakpoint], ...result };
	});

	return response;
};

export const getShapeDividerSVGStyles = (obj, location, blockStyle) => {
	const response = {
		label: 'Shape Divider SVG',
		general: {},
	};

	breakpoints.forEach(breakpoint => {
		response[breakpoint] = {};

		const { paletteStatus, paletteColor, paletteOpacity, color } =
			getPaletteAttributes({
				obj,
				prefix: `shape-divider-${location}-`,
				breakpoint,
			});

		if (!paletteStatus && !isNil(color)) {
			response[breakpoint].fill = color;
		} else if (paletteStatus && paletteColor) {
			response[breakpoint].fill = getColorRGBAString({
				firstVar: `color-${paletteColor}`,
				opacity: obj[paletteOpacity],
				blockStyle,
			});
		}
	});

	return response;
};
