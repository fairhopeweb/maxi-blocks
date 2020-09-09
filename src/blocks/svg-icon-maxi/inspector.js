/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const { Fragment } = wp.element;
const { TextControl } = wp.components;

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
	SettingTabsControl,
	SvgStrokeWidthControl,
	SvgAnimationControl,
	SvgAnimationDurationControl,
	SvgWidthControl,
	__experimentalResponsiveSelector,
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
} from '../../components';

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

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
			alignment,
			background,
			opacity,
			boxShadow,
			border,
			padding,
			margin,
			backgroundHover,
			opacityHover,
			boxShadowHover,
			borderHover,
			extraClassName,
			zIndex,
			breakpoints,
			position,
			display,
			motion,
			transform,
			clipPath,
			hover,
			stroke,
			defaultStroke,
			animation,
			duration,
			width,
		},
		clientId,
		deviceType,
		setAttributes,
	} = props;

	function isAnimatedSvg() {
		if (
			wp.data.select('core/block-editor').getSelectedBlock() !== null &&
			wp.data.select('core/block-editor').getSelectedBlock().name ===
				'maxi-blocks/svg-icon-maxi'
		) {
			const { clientId } = wp.data
				.select('core/block-editor')
				.getSelectedBlock();
			const currentContent = wp.data
				.select('core/block-editor')
				.getSelectedBlock().attributes.content;
			if (
				currentContent.indexOf('<animate') !== -1 ||
				currentContent.indexOf('<!--animate') !== -1
			) {
				const newContent = currentContent.replace(
					/animateTransform'/g,
					'animatetransform'
				);
				wp.data
					.dispatch('core/block-editor')
					.updateBlockAttributes(clientId, { content: newContent });
				return true;
			}
			return false;
		}
		return false;
	}

	function changeSvgStrokeWidth(width) {
		if (width) {
			const { clientId } = wp.data
				.select('core/block-editor')
				.getSelectedBlock();
			const currentContent = wp.data
				.select('core/block-editor')
				.getSelectedBlock().attributes.content;
			const regexLineToChange = new RegExp('stroke-width=".+?(?= )', 'g');
			const changeTo = `stroke-width="${width}"`;
			const newContent = currentContent.replace(
				regexLineToChange,
				changeTo
			);

			wp.data
				.dispatch('core/block-editor')
				.updateBlockAttributes(clientId, { content: newContent });
		}
	}

	function changeSvgAnimation(animation) {
		const { clientId } = wp.data
			.select('core/block-editor')
			.getSelectedBlock();
		const currentContent = wp.data
			.select('core/block-editor')
			.getSelectedBlock().attributes.content;
		let newContent = '';
		const hoverContent = '';

		switch (animation) {
			case 'loop':
				newContent = currentContent.replace(
					/repeatCount="1"/g,
					'repeatCount="indefinite"'
				);
				newContent = newContent.replace(/dur="0"/g, 'dur="3.667s"');
				break;
			case 'load-once':
				newContent = currentContent.replace(
					/repeatCount="indefinite"/g,
					'repeatCount="1"'
				);
				newContent = newContent.replace(/dur="0"/g, 'dur="3.667s"');
				break;
			case 'hover-loop':
				newContent = currentContent.replace(
					new RegExp('dur=".+?(?= )', 'g'),
					'dur="0"'
				);
				// hoverContent = currentContent.replace(/repeatCount="1"/g,  'repeatCount="indefinite"');
				// hoverContent = hoverContent.replace(/dur="0"/g, 'dur="3.667s"');
				break;
			case 'hover-once':
				break;
			case 'hover-off':
				break;
			case 'off':
				newContent = currentContent.replace(
					new RegExp('dur=".+?(?= )', 'g'),
					'dur="0"'
				);
				break;
			default:
				return;
		}

		if (!isEmpty(newContent))
			wp.data
				.dispatch('core/block-editor')
				.updateBlockAttributes(clientId, { content: newContent });
	}

	function changeSvgAnimationDuration(duration) {
		const { clientId } = wp.data
			.select('core/block-editor')
			.getSelectedBlock();
		const currentContent = wp.data
			.select('core/block-editor')
			.getSelectedBlock().attributes.content;
		let newContent = '';

		const regexLineToChange = new RegExp('dur=".+?(?= )', 'g');
		const changeTo = `dur="${duration}s"`;
		newContent = currentContent.replace(regexLineToChange, changeTo);

		if (!isEmpty(newContent))
			wp.data
				.dispatch('core/block-editor')
				.updateBlockAttributes(clientId, { content: newContent });
	}

	function changeSvgSize(width) {
		const { clientId } = wp.data
			.select('core/block-editor')
			.getSelectedBlock();
		const currentContent = wp.data
			.select('core/block-editor')
			.getSelectedBlock().attributes.content;
		let newContent = '';

		const regexLineToChange = new RegExp('width=".+?(?=")');
		const changeTo = `width="${width}`;

		const regexLineToChange2 = new RegExp('height=".+?(?=")');
		const changeTo2 = `height="${width}`;

		newContent = currentContent.replace(regexLineToChange, changeTo);
		newContent = newContent.replace(regexLineToChange2, changeTo2);

		if (newContent.indexOf('viewBox') === -1) {
			const changeTo3 = ' viewBox="0 0 64 64"><defs>';
			newContent = newContent.replace(/><defs>/, changeTo3);
		}

		if (!isEmpty(newContent))
			wp.data
				.dispatch('core/block-editor')
				.updateBlockAttributes(clientId, { content: newContent });
	}

	return (
		<InspectorControls>
			<__experimentalResponsiveSelector />
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
																	<__experimentalOpacityControl
																		opacity={
																			opacity
																		}
																		defaultOpacity={getDefaultProp(
																			clientId,
																			'opacity'
																		)}
																		onChange={opacity =>
																			setAttributes(
																				{
																					opacity,
																				}
																			)
																		}
																		breakpoint={
																			deviceType
																		}
																	/>
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
																	<__experimentalOpacityControl
																		opacity={
																			opacityHover
																		}
																		defaultOpacity={getDefaultProp(
																			clientId,
																			'opacityHover'
																		)}
																		onChange={opacityHover =>
																			setAttributes(
																				{
																					opacityHover,
																				}
																			)
																		}
																		breakpoint={
																			deviceType
																		}
																	/>
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
												'Line Width',
												'maxi-blocks'
											),
											content: (
												<SvgStrokeWidthControl
													stroke={stroke}
													defaultStroke={
														defaultStroke
													}
													onChange={stroke => {
														setAttributes({
															stroke,
														});
														changeSvgStrokeWidth(
															stroke
														);
													}}
													breakpoint={deviceType}
												/>
											),
										},
										{
											label: __('Width', 'maxi-blocks'),
											content: (
												<SvgWidthControl
													width={width}
													onChange={width => {
														setAttributes({
															width,
														});
														changeSvgSize(width);
													}}
													breakpoint={deviceType}
												/>
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
										isAnimatedSvg() && {
											label: __(
												'SVG Animation',
												'maxi-blocks'
											),
											content: (
												<Fragment>
													<SvgAnimationControl
														animation={animation}
														onChange={animation => {
															setAttributes({
																animation,
															});
															changeSvgAnimation(
																animation
															);
														}}
													/>
													{animation !== 'off' && (
														<SvgAnimationDurationControl
															duration={duration}
															onChange={duration => {
																setAttributes({
																	duration,
																});
																changeSvgAnimationDuration(
																	duration
																);
															}}
														/>
													)}
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
								<div className='maxi-tab-content__box'>
									{deviceType === 'general' && (
										<Fragment>
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
										</Fragment>
									)}
									<__experimentalZIndexControl
										zIndex={zIndex}
										defaultZIndex={getDefaultProp(
											clientId,
											'zIndex'
										)}
										onChange={zIndex =>
											setAttributes({ zIndex })
										}
										breakpoint={deviceType}
									/>
									{deviceType != 'general' && (
										<__experimentalResponsiveControl
											breakpoints={breakpoints}
											defaultBreakpoints={getDefaultProp(
												clientId,
												'breakpoints'
											)}
											onChange={breakpoints =>
												setAttributes({ breakpoints })
											}
											breakpoint={deviceType}
										/>
									)}
									<__experimentalPositionControl
										position={position}
										defaultPosition={getDefaultProp(
											clientId,
											'position'
										)}
										onChange={position =>
											setAttributes({ position })
										}
										breakpoint={deviceType}
									/>
									<__experimentalDisplayControl
										display={display}
										onChange={display =>
											setAttributes({ display })
										}
										breakpoint={deviceType}
										defaultDisplay='flex'
									/>
									<__experimentalClipPath
										clipPath={clipPath}
										onChange={clipPath =>
											setAttributes({ clipPath })
										}
									/>
								</div>
								<AccordionControl
									isPrimary
									items={[
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
