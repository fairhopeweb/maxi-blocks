/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { Fragment } = wp.element;
const {
	RangeControl,
	SelectControl,
	TextareaControl,
	TextControl,
} = wp.components;

/**
 * Internal dependencies
 */
import { getDefaultProp } from '../../utils';
import {
	AccordionControl,
	AlignmentControl,
	BackgroundControl,
	BorderControl,
	BlockStylesControl,
	BoxShadowControl,
	FullSizeControl,
	ImageCropControl,
	SettingTabsControl,
	TypographyControl,
	__experimentalZIndexControl,
	__experimentalAxisControl,
	__experimentalResponsiveControl,
	__experimentalOpacityControl,
	__experimentalPositionControl,
	__experimentalDisplayControl,
	__experimentalMotionControl,
	__experimentalTransformControl,
	__experimentalClipPath,
	__experimentalEntranceAnimationControl,
	__experimentalHoverEffectControl,
	__experimentalImageAltControl,
	__experimentalFancyRadioControl,
	__experimentalSVGDefaultsDisplayer,
} from '../../components';
import { injectImgSVG } from '../../extensions/svg/utils';

/**
 * External dependencies
 */
import { capitalize, isEmpty, isNil, isObject } from 'lodash';

/**
 * Inspector
 */
const Inspector = props => {
	const {
		attributes: {
			uniqueID,
			isFirstOnHierarchy,
			blockStyle,
			defaultBlockStyle,
			imageSize,
			cropOptions,
			fullWidth,
			alignment,
			captionType,
			captionContent,
			captionTypography,
			background,
			opacity,
			boxShadow,
			border,
			size,
			padding,
			margin,
			backgroundHover,
			boxShadowHover,
			borderHover,
			mediaID,
			mediaURL,
			extraClassName,
			zIndex,
			mediaAlt,
			altSelector,
			breakpoints,
			position,
			display,
			motion,
			transform,
			clipPath,
			hover,
			SVGData,
		},
		imageData,
		clientId,
		deviceType,
		setAttributes,
	} = props;

	const sizeValue = !isObject(size) ? JSON.parse(size) : size;

	const defaultSize = JSON.parse(getDefaultProp(clientId, 'size'));

	const getSizeOptions = () => {
		const response = [];
		if (imageData) {
			let { sizes } = imageData.media_details;
			sizes = Object.entries(sizes).sort((a, b) => {
				return a[1].width - b[1].width;
			});
			sizes.forEach(size => {
				const name = capitalize(size[0]);
				const val = size[1];
				response.push({
					label: `${name} - ${val.width}x${val.height}`,
					value: size[0],
				});
			});
		}
		response.push({
			label: 'Custom',
			value: 'custom',
		});
		return response;
	};

	const getCaptionOptions = () => {
		const response = [
			{ label: 'None', value: 'none' },
			{ label: 'Custom Caption', value: 'custom' },
		];
		if (imageData && !isEmpty(imageData.caption.rendered)) {
			const newCaption = {
				label: 'Attachment Caption',
				value: 'attachment',
			};
			response.splice(1, 0, newCaption);
		}
		return response;
	};

	const backgroundHoverValue = !isObject(backgroundHover)
		? JSON.parse(backgroundHover)
		: backgroundHover;

	return (
		<InspectorControls>
			<SettingTabsControl
				disablePadding
				items={[
					{
						label: __('Style', 'maxi-blocks'),
						content: (
							<Fragment>
								<div className='maxi-tab-content__box'>
									<BlockStylesControl
										blockStyle={blockStyle}
										onChangeBlockStyle={blockStyle =>
											setAttributes({ blockStyle })
										}
										defaultBlockStyle={defaultBlockStyle}
										onChangeDefaultBlockStyle={defaultBlockStyle =>
											setAttributes({ defaultBlockStyle })
										}
										isFirstOnHierarchy={isFirstOnHierarchy}
									/>
								</div>
								<AccordionControl
									isSecondary
									items={[
										{
											label: __(
												'Alignment',
												'maxi-blocks'
											),
											content: (
												<AlignmentControl
													alignment={alignment}
													onChange={alignment =>
														setAttributes({
															alignment,
														})
													}
													disableJustify
													breakpoint={deviceType}
												/>
											),
										},
										deviceType === 'general' && {
											label: __(
												'Image Dimension',
												'maxi-blocks'
											),
											content: (
												<Fragment>
													<SelectControl
														label={__(
															'Image Size',
															'maxi-blocks'
														)}
														value={
															imageSize ||
															imageSize ===
																'custom'
																? imageSize
																: 'full'
														} // is still necessary?
														options={getSizeOptions()}
														onChange={imageSize =>
															setAttributes({
																imageSize,
															})
														}
													/>
													{imageSize === 'custom' && (
														<ImageCropControl
															mediaID={mediaID}
															cropOptions={JSON.parse(
																cropOptions
															)}
															onChange={cropOptions =>
																setAttributes({
																	cropOptions: JSON.stringify(
																		cropOptions
																	),
																})
															}
														/>
													)}
													<RangeControl
														label={__(
															'Width',
															'maxi-blocks'
														)}
														value={
															sizeValue.general
																.width
														}
														onChange={val => {
															if (isNil(val))
																sizeValue.general.width =
																	defaultSize.general.width;
															else
																sizeValue.general.width = val;

															setAttributes({
																size: JSON.stringify(
																	sizeValue
																),
															});
														}}
														allowReset
														initialPosition={
															defaultSize.general
																.width
														}
													/>
												</Fragment>
											),
										},
										deviceType === 'general' && {
											label: __(
												'Image Alt Tag',
												'maxi-blocks'
											),
											content: (
												<__experimentalImageAltControl
													mediaAlt={mediaAlt}
													altSelector={altSelector}
													onChangeAltSelector={altSelector => {
														setAttributes({
															altSelector,
														});
													}}
													onChangeMediaAlt={mediaAlt =>
														setAttributes({
															mediaAlt,
														})
													}
												/>
											),
										},
										deviceType === 'general' && {
											label: __('Caption', 'maxi-blocks'),
											content: (
												<Fragment>
													<SelectControl
														value={captionType}
														options={getCaptionOptions()}
														onChange={captionType => {
															setAttributes({
																captionType,
															});
															if (
																imageData &&
																captionType ===
																	'attachment'
															)
																setAttributes({
																	captionContent:
																		imageData
																			.caption
																			.raw,
																});
														}}
													/>
													{captionType ===
														'custom' && (
														<TextareaControl
															className='custom-caption'
															placeHolder={__(
																'Add you Custom Caption here',
																'maxi-blocks'
															)}
															value={
																captionContent
															}
															onChange={captionContent =>
																setAttributes({
																	captionContent,
																})
															}
														/>
													)}
													{captionType !== 'none' && (
														<TypographyControl
															typography={
																captionTypography
															}
															defaultTypography={getDefaultProp(
																clientId,
																'captionTypography'
															)}
															onChange={obj =>
																setAttributes({
																	captionTypography:
																		obj.typography,
																})
															}
															breakpoint={
																deviceType
															}
														/>
													)}
												</Fragment>
											),
										},
										{
											label: __(
												'Background',
												'maxi-blocks'
											),
											disablePadding: true,
											content: (
												<SettingTabsControl
													items={[
														{
															label: __(
																'Normal',
																'gutenberg-extra'
															),
															content: (
																<Fragment>
																	<BackgroundControl
																		background={
																			background
																		}
																		defaultBackground={getDefaultProp(
																			clientId,
																			'background'
																		)}
																		onChange={background =>
																			setAttributes(
																				{
																					background,
																				}
																			)
																		}
																		disableImage
																		disableVideo
																		disableGradient
																	/>
																</Fragment>
															),
														},
														{
															label: __(
																'Hover',
																'gutenberg-extra'
															),
															content: (
																<Fragment>
																	<__experimentalFancyRadioControl
																		label={__(
																			'Enable Background Hover',
																			'maxi-blocks'
																		)}
																		selected={
																			backgroundHoverValue.status
																		}
																		options={[
																			{
																				label: __(
																					'Yes',
																					'maxi-blocks'
																				),
																				value: 1,
																			},
																			{
																				label: __(
																					'No',
																					'maxi-blocks'
																				),
																				value: 0,
																			},
																		]}
																		onChange={val => {
																			backgroundHoverValue.status = Number(
																				val
																			);
																			setAttributes(
																				{
																					backgroundHover: JSON.stringify(
																						backgroundHoverValue
																					),
																				}
																			);
																		}}
																	/>
																	{!!backgroundHoverValue.status && (
																		<BackgroundControl
																			background={
																				backgroundHover
																			}
																			defaultBackground={getDefaultProp(
																				clientId,
																				'backgroundHover'
																			)}
																			onChange={backgroundHover =>
																				setAttributes(
																					{
																						backgroundHover,
																					}
																				)
																			}
																			disableImage
																			disableVideo
																			disableGradient
																		/>
																	)}
																</Fragment>
															),
														},
													]}
												/>
											),
										},
										{
											label: __('Border', 'maxi-blocks'),
											disablePadding: true,
											content: (
												<SettingTabsControl
													items={[
														{
															label: __(
																'Normal',
																'gutenberg-extra'
															),
															content: (
																<BorderControl
																	border={
																		border
																	}
																	defaultBorder={getDefaultProp(
																		clientId,
																		'border'
																	)}
																	onChange={border =>
																		setAttributes(
																			{
																				border,
																			}
																		)
																	}
																	breakpoint={
																		deviceType
																	}
																/>
															),
														},
														{
															label: __(
																'Hover',
																'gutenberg-extra'
															),
															content: (
																<BorderControl
																	border={
																		borderHover
																	}
																	defaultBorder={getDefaultProp(
																		clientId,
																		'borderHover'
																	)}
																	onChange={borderHover =>
																		setAttributes(
																			{
																				borderHover,
																			}
																		)
																	}
																	breakpoint={
																		deviceType
																	}
																/>
															),
														},
													]}
												/>
											),
										},
										{
											label: __(
												'Width / Height',
												'maxi-blocks'
											),
											content: (
												<Fragment>
													{isFirstOnHierarchy && (
														<__experimentalFancyRadioControl
															label={__(
																'Full Width',
																'maxi-blocks'
															)}
															selected={fullWidth}
															options={[
																{
																	label: __(
																		'No',
																		'maxi-blocks'
																	),
																	value:
																		'normal',
																},
																{
																	label: __(
																		'Yes',
																		'maxi-blocks'
																	),
																	value:
																		'full',
																},
															]}
															onChange={fullWidth =>
																setAttributes({
																	fullWidth,
																})
															}
														/>
													)}
													<FullSizeControl
														size={size}
														defaultSize={getDefaultProp(
															clientId,
															'size'
														)}
														onChange={size =>
															setAttributes({
																size,
															})
														}
														breakpoint={deviceType}
														hideWidth
													/>
												</Fragment>
											),
										},
										{
											label: __(
												'Box Shadow',
												'maxi-blocks'
											),
											disablePadding: true,
											content: (
												<SettingTabsControl
													items={[
														{
															label: __(
																'Normal',
																'gutenberg-extra'
															),
															content: (
																<BoxShadowControl
																	boxShadow={
																		boxShadow
																	}
																	defaultBoxShadow={getDefaultProp(
																		clientId,
																		'boxShadow'
																	)}
																	onChange={boxShadow =>
																		setAttributes(
																			{
																				boxShadow,
																			}
																		)
																	}
																	breakpoint={
																		deviceType
																	}
																/>
															),
														},
														{
															label: __(
																'Hover',
																'gutenberg-extra'
															),
															content: (
																<BoxShadowControl
																	boxShadow={
																		boxShadowHover
																	}
																	defaultBoxShadow={getDefaultProp(
																		clientId,
																		'boxShadowHover'
																	)}
																	onChange={boxShadowHover =>
																		setAttributes(
																			{
																				boxShadowHover,
																			}
																		)
																	}
																	breakpoint={
																		deviceType
																	}
																/>
															),
														},
													]}
												/>
											),
										},
										{
											label: __(
												'Padding / Margin',
												'maxi-blocks'
											),
											content: (
												<Fragment>
													<__experimentalAxisControl
														values={padding}
														defaultValues={getDefaultProp(
															clientId,
															'padding'
														)}
														onChange={padding =>
															setAttributes({
																padding,
															})
														}
														breakpoint={deviceType}
														disableAuto
													/>
													<__experimentalAxisControl
														values={margin}
														defaultValues={getDefaultProp(
															clientId,
															'margin'
														)}
														onChange={margin =>
															setAttributes({
																margin,
															})
														}
														breakpoint={deviceType}
													/>
												</Fragment>
											),
										},
									]}
								/>
							</Fragment>
						),
					},
					{
						label: __('Advanced', 'maxi-blocks'),
						content: (
							<Fragment>
								<AccordionControl
									isPrimary
									items={[
										deviceType === 'general' && {
											label: __(
												'Custom Classes',
												'maxi-blocks'
											),
											content: (
												<TextControl
													label={__(
														'Additional CSS Classes',
														'maxi-blocks'
													)}
													className='maxi-additional__css-classes'
													value={extraClassName}
													onChange={extraClassName =>
														setAttributes({
															extraClassName,
														})
													}
												/>
											),
										},
										{
											label: __(
												'Clip-Path',
												'maxi-blocks'
											),
											content: (
												<__experimentalClipPath
													clipPath={clipPath}
													onChange={clipPath =>
														setAttributes({
															clipPath,
														})
													}
												/>
											),
										},
										{
											label: __('Shape', 'maxi-blocks'),
											content: (
												<__experimentalSVGDefaultsDisplayer
													SVGData={SVGData}
													onChange={SVGOptions => {
														const SVGValue = !isObject(
															SVGOptions.SVGData
														)
															? JSON.parse(
																	SVGOptions.SVGData
															  )
															: SVGOptions.SVGData;

														const el = Object.keys(
															SVGValue
														)[0];

														SVGValue[
															el
														].imageID = mediaID;
														SVGValue[
															el
														].imageURL = mediaURL;

														setAttributes({
															...SVGOptions,
															SVGElement: injectImgSVG(
																SVGOptions.SVGElement,
																SVGValue
															).outerHTML,
														});
													}}
												/>
											),
										},
										{
											label: __(
												'Motion Effects',
												'maxi-blocks'
											),
											content: (
												<__experimentalMotionControl
													motion={motion}
													onChange={motion =>
														setAttributes({
															motion,
														})
													}
												/>
											),
										},
										{
											label: __(
												'Hover Effects',
												'maxi-blocks'
											),
											content: (
												<__experimentalHoverEffectControl
													hover={hover}
													defaultHover={getDefaultProp(
														clientId,
														'hover'
													)}
													onChange={hover =>
														setAttributes({ hover })
													}
													uniqueID={uniqueID}
												/>
											),
										},
										{
											label: __(
												'Entrance Animation',
												'maxi-blocks'
											),
											content: (
												<__experimentalEntranceAnimationControl
													motion={motion}
													defaultMotion={getDefaultProp(
														clientId,
														'motion'
													)}
													onChange={motion =>
														setAttributes({
															motion,
														})
													}
												/>
											),
										},
										{
											label: __(
												'Transform',
												'maxi-blocks'
											),
											content: (
												<__experimentalTransformControl
													transform={transform}
													onChange={transform =>
														setAttributes({
															transform,
														})
													}
													uniqueID={uniqueID}
													breakpoint={deviceType}
												/>
											),
										},
										{
											label: __('Display', 'maxi-blocks'),
											content: (
												<__experimentalDisplayControl
													display={display}
													onChange={display =>
														setAttributes({
															display,
														})
													}
													breakpoint={deviceType}
												/>
											),
										},
										{
											label: __(
												'Position',
												'maxi-blocks'
											),
											content: (
												<__experimentalPositionControl
													position={position}
													defaultPosition={getDefaultProp(
														clientId,
														'position'
													)}
													onChange={position =>
														setAttributes({
															position,
														})
													}
													breakpoint={deviceType}
												/>
											),
										},
										deviceType !== 'general' && {
											label: __(
												'Breakpoint',
												'maxi-blocks'
											),
											content: (
												<__experimentalResponsiveControl
													breakpoints={breakpoints}
													defaultBreakpoints={getDefaultProp(
														clientId,
														'breakpoints'
													)}
													onChange={breakpoints =>
														setAttributes({
															breakpoints,
														})
													}
													breakpoint={deviceType}
												/>
											),
										},
										{
											label: __('Z-index', 'maxi-blocks'),
											content: (
												<__experimentalZIndexControl
													zIndex={zIndex}
													defaultZIndex={getDefaultProp(
														clientId,
														'zIndex'
													)}
													onChange={zIndex =>
														setAttributes({
															zIndex,
														})
													}
													breakpoint={deviceType}
												/>
											),
										},
										{
											label: __('Opacity', 'maxi-blocks'),
											content: (
												<__experimentalOpacityControl
													opacity={opacity}
													defaultOpacity={getDefaultProp(
														clientId,
														'opacity'
													)}
													onChange={opacity =>
														setAttributes({
															opacity,
														})
													}
													breakpoint={deviceType}
												/>
											),
										},
									]}
								/>
							</Fragment>
						),
					},
				]}
			/>
		</InspectorControls>
	);
};

export default Inspector;
