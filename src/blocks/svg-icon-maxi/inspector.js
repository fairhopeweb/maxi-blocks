/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import {
	AccordionControl,
	BlockStylesControl,
	CustomLabel,
	SettingTabsControl,
	SvgColorControl,
	SvgStrokeWidthControl,
	SvgWidthControl,
} from '../../components';
import {
	getColorRGBAString,
	getGroupAttributes,
} from '../../extensions/styles';
import * as inspectorTabs from '../../components/inspector-tabs';
import { selectorsSvgIcon, categoriesSvgIcon } from './custom-css';

/**
 * Inspector
 */
const Inspector = props => {
	const {
		attributes,
		changeSVGContent,
		changeSVGContentWithBlockStyle,
		changeSVGStrokeWidth,
		clientId,
		deviceType,
		maxiSetAttributes,
	} = props;
	const {
		blockStyle,
		customLabel,
		isFirstOnHierarchy,
		parentBlockStyle,
		svgType,
	} = attributes;

	return (
		<InspectorControls>
			{inspectorTabs.responsiveInfoBox({ props })}
			<SettingTabsControl
				target='sidebar-settings-tabs'
				disablePadding
				deviceType={deviceType}
				depth={0}
				items={[
					{
						label: __('Settings', 'maxi-blocks'),
						content: (
							<>
								{deviceType === 'general' && (
									<div className='maxi-tab-content__box'>
										<CustomLabel
											customLabel={customLabel}
											onChange={customLabel =>
												maxiSetAttributes({
													customLabel,
												})
											}
										/>
										<BlockStylesControl
											blockStyle={blockStyle}
											isFirstOnHierarchy={
												isFirstOnHierarchy
											}
											onChange={obj => {
												maxiSetAttributes(obj);

												const { parentBlockStyle } =
													obj;

												const {
													'svg-fill-palette-color':
														svgPaletteFillColor,
													'svg-fill-palette-opacity':
														svgPaletteFillOpacity,
													'svg-fill-color':
														svgFillColor,
													'svg-line-palette-color':
														svgPaletteLineColor,
													'svg-line-palette-opacity':
														svgPaletteLineOpacity,
													'svg-line-color':
														svgLineColor,
												} = attributes;

												const fillColorStr =
													getColorRGBAString({
														firstVar: 'icon-fill',
														secondVar: `color-${svgPaletteFillColor}`,
														opacity:
															svgPaletteFillOpacity,
														blockStyle:
															parentBlockStyle,
													});
												const lineColorStr =
													getColorRGBAString({
														firstVar: 'icon-line',
														secondVar: `color-${svgPaletteLineColor}`,
														opacity:
															svgPaletteLineOpacity,
														blockStyle:
															parentBlockStyle,
													});

												changeSVGContentWithBlockStyle(
													attributes[
														'svg-fill-palette-status'
													]
														? fillColorStr
														: svgFillColor,
													attributes[
														'svg-line-palette-status'
													]
														? lineColorStr
														: svgLineColor
												);
											}}
											clientId={clientId}
										/>
									</div>
								)}
								<AccordionControl
									isSecondary
									items={[
										...inspectorTabs.alignment({
											props,
											isAlignment: true,
											disableJustify: true,
										}),
										attributes.content && {
											label: __('Colour', 'maxi-blocks'),
											content: (
												<SvgColorControl
													{...getGroupAttributes(
														attributes,
														'svg'
													)}
													{...getGroupAttributes(
														attributes,
														'svgHover'
													)}
													svgType={svgType}
													maxiSetAttributes={
														maxiSetAttributes
													}
													onChange={obj => {
														maxiSetAttributes(obj);

														let fillColorStr = '';
														let lineColorStr = '';

														if (
															svgType !== 'Line'
														) {
															fillColorStr =
																getColorRGBAString(
																	{
																		firstVar:
																			'icon-fill',
																		secondVar: `color-${obj['svg-fill-palette-color']}`,
																		opacity:
																			obj[
																				'svg-fill-palette-opacity'
																			],
																		blockStyle:
																			parentBlockStyle,
																	}
																);
															changeSVGContent(
																obj[
																	'svg-fill-palette-status'
																]
																	? fillColorStr
																	: obj[
																			'svg-fill-color'
																	  ],
																'fill'
															);
														}

														if (
															svgType !== 'Shape'
														) {
															lineColorStr =
																getColorRGBAString(
																	{
																		firstVar:
																			'icon-line',
																		secondVar: `color-${obj['svg-line-palette-color']}`,
																		opacity:
																			obj[
																				'svg-line-palette-opacity'
																			],
																		blockStyle:
																			parentBlockStyle,
																	}
																);
															changeSVGContent(
																obj[
																	'svg-line-palette-status'
																]
																	? lineColorStr
																	: obj[
																			'svg-line-color'
																	  ],
																'stroke'
															);
														}
													}}
													onChangeHover={obj => {
														maxiSetAttributes(obj);

														const fillColorStr =
															getColorRGBAString({
																firstVar:
																	'icon-fill-hover',
																secondVar: `color-${obj['svg-fill-palette-color-hover']}`,
																opacity:
																	obj[
																		'svg-fill-palette-opacity-hover'
																	],
																blockStyle:
																	parentBlockStyle,
															});

														const lineColorStr =
															getColorRGBAString({
																firstVar:
																	'icon-line-hover',
																secondVar: `color-${obj['svg-line-palette-color-hover']}`,
																opacity:
																	obj[
																		'svg-line-palette-opacity-hover'
																	],
																blockStyle:
																	parentBlockStyle,
															});

														// svgType !== 'Line' &&
														// 	changeSVGContent(
														// 		obj[
														// 			'svg-fill-palette-status-hover'
														// 		]
														// 			? fillColorStr
														// 			: obj[
														// 					'svg-fill-color-hover'
														// 			  ],
														// 		'fill'
														// 	);

														// svgType !== 'Shape' &&
														// 	changeSVGContent(
														// 		obj[
														// 			'svg-line-palette-status-hover'
														// 		]
														// 			? lineColorStr
														// 			: obj[
														// 					'svg-line-color-hover'
														// 			  ],
														// 		'stroke'
														// 	);
													}}
												/>
											),
										},

										attributes.content &&
											svgType !== 'Shape' && {
												label: __(
													'Icon line width',
													'maxi-blocks'
												),
												content: (
													<SvgStrokeWidthControl
														{...getGroupAttributes(
															attributes,
															'svg'
														)}
														prefix='svg-'
														onChange={obj => {
															maxiSetAttributes(
																obj
															);
															changeSVGStrokeWidth(
																obj[
																	`svg-stroke-${deviceType}`
																]
															);
														}}
														breakpoint={deviceType}
													/>
												),
											},
										...inspectorTabs.background({
											label: 'SVG',
											props: {
												...props,
											},
											disableImage: true,
											disableVideo: true,
											disableClipPath: true,
											disableSVG: true,
											prefix: 'svg-',
										}),
										...inspectorTabs.border({
											props,
											prefix: 'svg-',
										}),
										...inspectorTabs.boxShadow({
											props,
											prefix: 'svg-',
										}),
										attributes.content && {
											label: __(
												'Height / Width',
												'maxi-blocks'
											),
											content: (
												<SvgWidthControl
													{...getGroupAttributes(
														attributes,
														'svg'
													)}
													onChange={obj => {
														maxiSetAttributes(obj);
													}}
													breakpoint={deviceType}
													prefix='svg-'
													enableResponsive
												/>
											),
										},
										...inspectorTabs.marginPadding({
											props,
											prefix: 'svg-',
										}),
									]}
								/>
							</>
						),
					},
					{
						label: __('Canvas', 'maxi-blocks'),
						content: (
							<AccordionControl
								isPrimary
								items={[
									...inspectorTabs.blockBackground({
										props,
										disableImage: true,
										disableVideo: true,
										disableGradient: true,
										disableSVG: true,
									}),
									...inspectorTabs.border({
										props,
									}),
									...inspectorTabs.boxShadow({
										props,
									}),
									...inspectorTabs.opacity({
										props,
									}),
									...inspectorTabs.size({
										props,
										block: true,
									}),
									...inspectorTabs.marginPadding({
										props,
									}),
								]}
							/>
						),
					},
					{
						label: __('Advanced', 'maxi-blocks'),
						content: (
							<>
								<AccordionControl
									isPrimary
									items={[
										deviceType === 'general' && {
											...inspectorTabs.customClasses({
												props,
											}),
										},
										deviceType === 'general' && {
											...inspectorTabs.anchor({
												props,
											}),
										},
										...inspectorTabs.customCss({
											props,
											breakpoint: deviceType,
											selectors: selectorsSvgIcon,
											categories: categoriesSvgIcon,
										}),
										...inspectorTabs.scrollEffects({
											props,
										}),
										...inspectorTabs.transform({
											props,
										}),
										...inspectorTabs.display({
											props,
										}),
										...inspectorTabs.position({
											props,
										}),
										deviceType !== 'general' && {
											...inspectorTabs.responsive({
												props,
											}),
										},
										...inspectorTabs.overflow({
											props,
										}),
										...inspectorTabs.flex({
											props,
										}),
										...inspectorTabs.zindex({
											props,
										}),
									]}
								/>
							</>
						),
					},
				]}
			/>
		</InspectorControls>
	);
};

export default Inspector;
