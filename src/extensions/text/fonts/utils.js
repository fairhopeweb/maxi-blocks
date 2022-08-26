/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * External dependencies
 */
import { isEmpty, isString, cloneDeep, isObject } from 'lodash';

/**
 * Internal dependencies
 */
import { getGroupAttributes } from '../../styles';
import { getCustomFormatValue } from '../formats';

const breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

export const getAllFonts = (
	attr,
	recursiveKey = false,
	isHover = false,
	textLevel = 'p',
	blockStyle = 'light',
	onlyBackend = false
) => {
	const { receiveMaxiSelectedStyleCard } = select('maxiBlocks/style-cards');
	const styleCard = receiveMaxiSelectedStyleCard()?.value || {};

	const result = {};

	const getAllFontsRecursively = obj => {
		breakpoints.forEach(breakpoint => {
			const fontName = obj[`font-family-${breakpoint}`];
			const fontWeight = obj[`font-weight-${breakpoint}`];
			const fontStyle = obj[`font-style-${breakpoint}`];

			if (
				fontName ||
				fontWeight ||
				fontStyle ||
				breakpoint === 'general'
			) {
				const finalFontName =
					fontName ??
					getCustomFormatValue({
						typography: { ...obj },
						prop: 'font-family',
						breakpoint,
						isHover,
						textLevel,
						avoidSC: !onlyBackend,
						styleCard,
					}) ??
					`sc_font_${blockStyle}_${textLevel}`;

				let finalFontWeight =
					fontWeight ??
					getCustomFormatValue({
						typography: { ...obj },
						prop: 'font-weight',
						breakpoint,
						isHover,
						textLevel,
						styleCard,
					})?.toString();

				let finalFontStyle =
					fontStyle ??
					getCustomFormatValue({
						typography: { ...obj },
						prop: 'font-style',
						breakpoint,
						isHover,
						textLevel,
						styleCard,
					});

				if (result[finalFontName]) {
					const {
						fontWeight: currentFontWeight,
						fontStyle: currentFontStyle,
					} = result[finalFontName];

					if (
						currentFontWeight &&
						!currentFontWeight.includes(finalFontWeight)
					)
						finalFontWeight = `${currentFontWeight},${finalFontWeight}`;
					if (
						currentFontStyle &&
						!currentFontStyle.includes(finalFontStyle)
					)
						finalFontStyle = `${currentFontStyle},${finalFontStyle}`;
				}

				result[finalFontName] = {
					fontWeight: finalFontWeight,
					fontStyle: finalFontStyle,
				};
			}
		});

		Object.entries(obj).forEach(([key, val]) => {
			if (
				typeof val !== 'undefined' &&
				isString(recursiveKey) &&
				key.includes(recursiveKey)
			) {
				let recursiveFonts = {};
				Object.values(val)?.forEach(recursiveVal => {
					recursiveFonts = {
						...recursiveFonts,
						...recursiveVal,
					};
				});

				getAllFontsRecursively(recursiveFonts);
			}
		});
	};

	getAllFontsRecursively(attr);

	return result;
};

const mergeDeep = (target, source) => {
	if (!isObject(target) || !isObject(source)) {
		return source;
	}

	Object.keys(source).forEach(key => {
		const targetValue = target[key];
		const sourceValue = source[key];

		if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
			target[key] = targetValue.concat(sourceValue);
		} else if (typeof targetValue === 'undefined') {
			target[key] = sourceValue;
		} else if (isObject(targetValue) && isObject(sourceValue)) {
			target[key] = mergeDeep({ ...targetValue }, { ...sourceValue });
		} else if (isString(targetValue) && isString(sourceValue)) {
			if (!targetValue.includes(sourceValue))
				target[key] = `${targetValue},${sourceValue}`;
		} else target[key] = sourceValue;
	});

	return target;
};

export const getPageFonts = (onlyBackend = false) => {
	const { getBlocks } = select('core/block-editor');

	let response = {};
	let oldResponse = {};
	let mergedResponse = {};
	const blocksWithFonts = [
		'maxi-blocks/number-counter-maxi',
		'maxi-blocks/button-maxi',
		'maxi-blocks/text-maxi',
		'maxi-blocks/image-maxi',
	];

	const getBlockFonts = blocks => {
		Object.entries(blocks).forEach(([key, block]) => {
			const { attributes, innerBlocks, name } = block;

			if (blocksWithFonts.includes(name) && !isEmpty(attributes)) {
				let typography = {};
				let typographyHover = {};
				let textLevel = attributes?.textLevel || 'p';
				const { blockStyle } = attributes;

				switch (name) {
					case 'maxi-blocks/number-counter-maxi':
						typography = {
							...getGroupAttributes(attributes, 'numberCounter'),
						};
						break;
					case 'maxi-blocks/button-maxi':
						typography = {
							...getGroupAttributes(attributes, 'typography'),
						};
						typographyHover = {
							...getGroupAttributes(
								attributes,
								'typographyHover'
							),
						};
						textLevel = 'button';
						break;
					default:
						typography = {
							...getGroupAttributes(attributes, 'typography'),
						};
						typographyHover = {
							...getGroupAttributes(
								attributes,
								'typographyHover'
							),
						};
						break;
				}

				if (typographyHover?.['typography-status-hover'])
					response = mergeDeep(
						getAllFonts(
							typography,
							false,
							false,
							textLevel,
							blockStyle,
							onlyBackend
						),
						getAllFonts(
							typographyHover,
							false,
							true,
							textLevel,
							blockStyle,
							onlyBackend
						)
					);
				else
					response = getAllFonts(
						typography,
						false,
						false,
						textLevel,
						blockStyle,
						onlyBackend
					);

				mergedResponse = mergeDeep(
					cloneDeep(oldResponse),
					cloneDeep(response)
				);

				oldResponse = cloneDeep(mergedResponse);
			}

			if (!isEmpty(innerBlocks)) getBlockFonts(innerBlocks);
		});

		return null;
	};

	getBlockFonts(getBlocks());

	return mergedResponse;
};
