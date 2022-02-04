/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { dispatch, select } from '@wordpress/data';

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';
/**
 * Loads the font on background using JS FontFace API
 * FontFaceSet API uses check() to check if a font exists, but needs to compare with some exact value:
 * in this case is used '12px' as a standard that returns if the font has been loaded.
 *
 * @param {string} font Name of the selected font
 */
const loadFonts = font => {
	if (typeof font === 'object' && font !== null) {
		Object.entries(font).forEach(([key, val]) => {
			const fontName = key;
			let fontWeight = val?.weight || '400';
			const fontStyle = val?.style;
			let fontData = val;

			// console.log('fontWeight');
			console.log(fontWeight);

			// console.log('fontName');
			// console.log(fontName);

			let fontWeightArr = [];

			if (fontWeight?.includes(',')) {
				fontWeightArr = fontWeight.split(',');
				fontWeight = fontWeight.substr(0, fontWeight.indexOf(','));
				fontData = { ...val, ...{ weight: fontWeight } };
			}

			const { files } = select('maxiBlocks/text').getFont(fontName);

			if (!isEmpty(fontWeightArr)) {
				fontWeightArr.forEach(weight => {
					Object.entries(files).forEach(variant => {
						if (variant[0] === weight) {
							console.log('Array!');
							console.log(variant[0]);
							fontData = { ...val, ...{ weight } };
							const fontLoad = new FontFace(
								fontName,
								`url(${variant[1]})`,
								fontData
							);
							document.fonts.add(fontLoad);
							fontLoad.loaded.catch(err => {
								console.error(
									__(
										`Font hasn't been able to download: ${err}`
									)
								);
							});
						}
					});
				});
			} else
				Object.entries(files).forEach(variant => {
					if (variant[0] === fontWeight) {
						console.log(variant[0]);
						const fontLoad = new FontFace(
							fontName,
							`url(${variant[1]})`,
							fontData
						);
						document.fonts.add(fontLoad);
						fontLoad.loaded.catch(err => {
							console.error(
								__(`Font hasn't been able to download: ${err}`)
							);
						});
					}
				});
		});

		dispatch('maxiBlocks/text').updateFonts(JSON.stringify(font));
	}

	return null;
};

export default loadFonts;
