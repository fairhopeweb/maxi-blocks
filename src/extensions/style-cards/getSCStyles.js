/**
 * External dependencies
 */
import { times, compact } from 'lodash';
import { processCss } from '../styles/store/controls';

/**
 * Giving a style card object, returns the CSS styles for SC for each block.
 */
const getSCStyles = (styleCard, isBackend = false) => {
	let response = '';
	const prefix = 'body.maxi-blocks--active';
	const nativeWPPrefix = isBackend ? 'wp-block' : 'maxi-block--use-sc';

	const styles = ['light', 'dark'];
	const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	const levels = ['p', ...headings];
	const elements = ['button', ...levels, 'icon', 'divider', 'link'];
	const breakpoints = {
		xxl: 1921,
		xl: 1920,
		l: 1366,
		m: 1024,
		s: 768,
		xs: 480,
	};
	const breakpointsKeys = ['general', ...Object.keys(breakpoints)];
	const settings = [
		'font-family',
		'font-size',
		'font-style',
		'font-weight',
		'line-height',
		'text-decoration',
		'text-transform',
		'letter-spacing',
		'white-space',
		'word-spacing',
		'margin-bottom',
		'text-indent',
	];

	let organizedValues = {};

	styles.forEach(style => {
		elements.forEach(element => {
			breakpointsKeys.forEach(breakpoint => {
				settings.forEach(setting => {
					const label = `--maxi-${style}-${element}-${setting}-${breakpoint}`;

					if (styleCard[label]) {
						organizedValues = {
							...organizedValues,
							[style]: {
								...organizedValues?.[style],
								[element]: {
									...organizedValues[style]?.[element],
									[breakpoint]: {
										...organizedValues?.[style]?.[
											element
										]?.[breakpoint],
										[setting]: styleCard[label],
									},
								},
							},
						};

						delete styleCard[label];
					}
				});
			});
		});
	});

	// Colors
	styles.forEach(style => {
		times(8, i => {
			const label = `--maxi-${style}-color-${i + 1}`;

			if (styleCard[label]) {
				organizedValues = {
					...organizedValues,
					[style]: {
						...organizedValues?.[style],
						color: {
							...organizedValues?.[style]?.color,
							[i + 1]: styleCard[label],
						},
					},
				};

				delete styleCard[label];
			}
		});
	});

	// Create styles
	styles.forEach(style => {
		// Link colors
		if (organizedValues[style]?.color) {
			times(8, i => {
				const colorNumber = i + 1;

				if (organizedValues[style]?.color[colorNumber]) {
					// Link color
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-palette: var(--maxi-${style}-color-${colorNumber});}`;

					// Link hover color
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-hover-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-hover-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-hover-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-hover-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-hover-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-hover-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-hover-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-hover-palette: var(--maxi-${style}-color-${colorNumber});}`;

					// Link active color
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-active-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-active-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-active-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-active-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-active-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-active-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-active-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-active-palette: var(--maxi-${style}-color-${colorNumber});}`;

					// Link visited color
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-visited-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-visited-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style}.maxi-sc-${style}-link-visited-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-visited-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-visited-color-${colorNumber}.maxi-block--has-link { --maxi-${style}-link-visited-palette: var(--maxi-${style}-color-${colorNumber});}`;
					response += `${prefix} .maxi-${style} .maxi-sc-${style}-link-visited-color-${colorNumber} a.maxi-block--has-link { --maxi-${style}-link-visited-palette: var(--maxi-${style}-color-${colorNumber});}`;
				}
			});
		}

		// Individual settings per block type
		const getSentencesByBreakpoint = (breakpoint, targets) => {
			const sentences = targets.reduce((acc, target) => {
				acc[target] = compact(
					settings.map(setting => {
						const value =
							organizedValues?.[style]?.[target]?.[breakpoint]?.[
								setting
							];

						if (value)
							return `${setting}: var(--maxi-${style}-${target}-${setting}-${breakpoint});`;

						return null;
					})
				);

				return acc;
			}, {});

			return sentences;
		};

		const addStylesByBreakpoint = breakpoint => {
			const breakpointLevelSentences = getSentencesByBreakpoint(
				breakpoint,
				levels
			);

			Object.entries({ ...breakpointLevelSentences }).forEach(
				([level, sentences]) => {
					const targets = [
						`${prefix} .maxi-${style}.maxi-block.maxi-text-block`,
						`${prefix} .maxi-${style} .maxi-block.maxi-text-block`,
						`${prefix} .maxi-${style}.maxi-map-block__popup__content`,
						`${prefix} .maxi-${style} .maxi-map-block__popup__content`,
						`${prefix} .maxi-${style} .maxi-pane-block .maxi-pane-block__header`,
					];

					// Remove margin-bottom sentences
					const marginSentence = sentences?.find(
						sentence => sentence?.indexOf('margin-bottom') > -1
					);

					if (marginSentence)
						sentences?.splice(
							sentences?.indexOf(marginSentence),
							1
						);

					targets.forEach(target => {
						response += `${target} ${level} {${sentences?.join(
							' '
						)}}`;
					});
					// WP Native blocks
					response += `${prefix} .maxi-${style} ${level}.${nativeWPPrefix} {${sentences?.join(
						' '
					)}}`;
					response += `${prefix} .maxi-${style} ${level}.${nativeWPPrefix} a:first-of-type {${sentences?.join(
						' '
					)}}`;

					if (marginSentence) {
						// margin-bottom for Text Maxi
						response += `${prefix} .maxi-${style}.maxi-block.maxi-text-block ${level} {${marginSentence}}`;
						response += `${prefix} .maxi-${style} .maxi-block.maxi-text-block ${level} {${marginSentence}}`;
					}
				}
			);

			// Text Maxi list styles
			[
				`${prefix} .maxi-${style}maxi-list-block ul.maxi-text-block__content`,
				`${prefix} .maxi-${style} .maxi-list-block ul.maxi-text-block__content`,
				`${prefix} .maxi-${style}maxi-list-block ol.maxi-text-block__content`,
				`${prefix} .maxi-${style} .maxi-list-block ol.maxi-text-block__content`,
			].forEach(target => {
				const sentences = [...breakpointLevelSentences.p];

				const marginSentence = sentences?.find(
					sentence => sentence?.indexOf('margin-bottom') > -1
				);

				if (marginSentence) response += `${target} ${marginSentence}`;
			});

			[
				`${prefix} .maxi-${style}.maxi-block.maxi-text-block li`,
				`${prefix} .maxi-${style} .maxi-block.maxi-text-block li`,
				// WP native blocks
				`${prefix} .maxi-${style} li.${nativeWPPrefix}`,
			].forEach(target => {
				const sentences = [...breakpointLevelSentences.p];

				// Remove margin-bottom sentences
				const marginSentence = sentences?.find(
					sentence => sentence?.indexOf('margin-bottom') > -1
				);

				if (marginSentence)
					sentences?.splice(sentences?.indexOf(marginSentence), 1);

				response += `${target} {${sentences?.join(' ')}}`;
			});

			// Text Maxi when has link
			const textMaxiLinkPrefix = `${prefix} .maxi-${style}.maxi-block.maxi-block--has-link .maxi-text-block__ content`;
			const WPNativeLinkPrefix = `${prefix} .maxi-${style} .${nativeWPPrefix} a`;

			[textMaxiLinkPrefix, WPNativeLinkPrefix].forEach(prefix => {
				response += `${prefix} { color: var(--maxi-${style}-link); }`;
				response += `${prefix}:hover { color: var(--maxi-${style}-link-hover); }`;
				response += `${prefix}:focus { color: var(--maxi-${style}-link-hover); }`;
				response += `${prefix}:active { color: var(--maxi-${style}-link-active); }`;
				response += `${prefix}:visited { color: var(--maxi-${style}-link-visited); }`;
			});

			[
				`${prefix} .maxi-${style}.maxi-block.maxi-text-block a.maxi-block--has-link`,
				`${prefix} .maxi-${style}.maxi-block .maxi-text-block a.maxi-block--has-link`,
			].forEach(target => {
				response += `${target} { color: var(--maxi-${style}-link); }`;
				response += `${target}:hover { color: var(--maxi-${style}-link-hover); }`;
				response += `${target}:hover span { color: var(--maxi-${style}-link-hover); }`;
				response += `${target}:focus { color: var(--maxi-${style}-link-hover); }`;
				response += `${target}:focus span { color: var(--maxi-${style}-link-hover); }`;
				response += `${target}:active { color: var(--maxi-${style}-link-active); }`;
				response += `${target}:active span { color: var(--maxi-${style}-link-active); }`;
				response += `${target}:visited { color: var(--maxi-${style}-link-visited); }`;
				response += `${target}:visited span { color: var(--maxi-${style}-link-visited); }`;
			});

			// Image Maxi
			[
				`${prefix} .maxi-${style}.maxi-image-block .maxi-hover-details`,
				`${prefix} .maxi-${style} .maxi-image-block .maxi-hover-details`,
			].forEach(target => {
				const imageSentences = {
					h4: [...breakpointLevelSentences.h4],
					p: [...breakpointLevelSentences.p],
				};

				Object.entries(imageSentences).forEach(([level, sentences]) => {
					if (level !== 'p') {
						// Remove margin-bottom sentences
						const marginSentence = sentences?.find(
							sentence => sentence?.indexOf('margin-bottom') > -1
						);

						if (marginSentence)
							sentences?.splice(
								sentences?.indexOf(marginSentence),
								1
							);
					}

					response += `${target} ${level} {${sentences?.join(' ')}}`;
				});
			});

			// Image Maxi caption
			[
				`${prefix} .maxi-${style}.maxi-image-block figcaption`,
				`${prefix} .maxi-${style} .maxi-image-block figcaption`,
			].forEach(target => {
				const sentences = [...breakpointLevelSentences.p];

				// Remove margin-bottom sentences
				const marginSentence = sentences?.find(
					sentence => sentence?.indexOf('margin-bottom') > -1
				);

				if (marginSentence)
					sentences?.splice(sentences?.indexOf(marginSentence), 1);

				response += `${target} {${sentences?.join(' ')}}`;
			});

			// Search Maxi
			[
				`${prefix} .maxi-${style}.maxi-search-block .maxi-search-block__input`,
				`${prefix} .maxi-${style} .maxi-search-block .maxi-search-block__input`,
				`${prefix} .maxi-${style}.maxi-search-block .maxi-search-block__button__content`,
				`${prefix} .maxi-${style} .maxi-search-block .maxi-search-block__button__content`,
			].forEach(target => {
				const sentences = [...breakpointLevelSentences.p];

				// Remove margin-bottom sentences
				const marginSentence = sentences?.find(
					sentence => sentence?.indexOf('margin-bottom') > -1
				);

				if (marginSentence)
					sentences?.splice(sentences?.indexOf(marginSentence), 1);

				response += `${target} {${sentences?.join(' ')}}`;
			});

			// Button Maxi
			const generalButtonSentences = getSentencesByBreakpoint(
				breakpoint,
				['button']
			);

			[
				`${prefix} .maxi-${style}.maxi-block.maxi-button-block .maxi-button-block__content`,
				`${prefix} .maxi-${style}.maxi-block .maxi-button-block .maxi-button-block__content`,
				// WP native blocks
				`${prefix} .maxi-${style} button.${nativeWPPrefix}`,
			].forEach(target => {
				const sentences = [...generalButtonSentences.button];

				// Set font-family paragpraph variable as backup for the button font-family variables
				sentences.forEach((sentence, i) => {
					if (sentence?.includes('font-family')) {
						const pVar = sentence
							.replace('font-family: ', '')
							.replace('button', 'p')
							.replace(';', '');
						const newSentence = sentence.replace(')', `, ${pVar})`);

						sentences[i] = newSentence;
					}
				});

				if (
					!sentences?.some(sentence =>
						sentence?.includes('font-family')
					)
				) {
					const pFontFamilyVar = [
						...breakpointLevelSentences.p,
					]?.filter(sentence => sentence?.includes('font-family'))[0];

					sentences?.push(pFontFamilyVar);
				}

				// Remove margin-bottom sentences
				const marginSentence = sentences?.find(
					sentence => sentence?.indexOf('margin-bottom') > -1
				);

				if (marginSentence)
					sentences?.splice(sentences?.indexOf(marginSentence), 1);

				response += `${target} {${sentences?.join(' ')}}`;
			});

			// WP native blocks colors
			// General color
			response += `${prefix} .maxi-${style} .${nativeWPPrefix} {
				color: var(--maxi-${style}-p-color,rgba(var(--maxi-${style}-color-3,155,155,155),1));
			}`;

			// Headings color
			headings.forEach(heading => {
				response += `${prefix} .maxi-${style} ${heading}.${nativeWPPrefix} {
					color: var(--maxi-${style}-${heading}-color,rgba(var(--maxi-${style}-color-5,0,0,0),1));
				}`;
			});

			// Button color
			response += `${prefix} .maxi-${style} .wp-element-button.${nativeWPPrefix} {
				background: var(--maxi-${style}-button-background-color,rgba(var(--maxi-${style}-color-4,255,74,23),1));
			}`;
		};

		// General
		addStylesByBreakpoint('general');

		// Media queries
		Object.entries(breakpoints).forEach(([breakpoint, breakpointValue]) => {
			response += `@media (${
				breakpoint !== 'xxl' ? 'max' : 'min'
			}-width: ${breakpointValue}px) {`;

			addStylesByBreakpoint(breakpoint);

			response += '}';
		});
	});

	return processCss(response);
};

export default getSCStyles;
