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
import {
	AccordionControl,
	BlockStylesControl,
	SettingTabsControl,
	FancyRadioControl,
	CustomLabel,
} from '../../components';
import BorderControl from '../../components/border-control/newBorderControl';
import BoxShadowControl from '../../components/box-shadow-control/newBoxShadowControl';
import AxisControl from '../../components/axis-control/newAxisControl';
import BackgroundControl from '../../components/new-background-control';
import MotionControl from '../../components/new-motion-control';
import EntranceAnimationControl from '../../components/entrance-animation-control/newEntranceControl';
import TransformControl from '../../components/new-transform-control';
import DisplayControl from '../../components/display-control/newDisplayControl';
import PositionControl from '../../components/position-control/newPositionControl';
import ResponsiveControl from '../../components/responsive-control/newResponsiveControl';
import ZIndexControl from '../../components/zindex-control/newIndexControl';
import OpacityControl from '../../components/opacity-control/newOpacityControl';
import ParallaxControl from '../../components/parallax-control/newParallaxControl';

import getGroupAttributes from '../../extensions/styles/getGroupAttributes';
import getDefaultAttribute from '../../extensions/styles/getDefaultAttribute';

/**
 * Inspector
 */
const Inspector = props => {
	const { attributes, deviceType, setAttributes, clientId } = props;
	const {
		customLabel,
		uniqueID,
		isFirstOnHierarchy,
		blockStyle,
		defaultBlockStyle,
		blockStyleBackground,
		extraClassName,
	} = attributes;

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
									<CustomLabel
										customLabel={customLabel}
										onChange={customLabel =>
											setAttributes({ customLabel })
										}
									/>
									<hr />
									<BlockStylesControl
										blockStyle={blockStyle}
										blockStyleBackground={
											blockStyleBackground
										}
										defaultBlockStyle={defaultBlockStyle}
										isFirstOnHierarchy={isFirstOnHierarchy}
										onChange={obj => setAttributes(obj)}
										disableHighlightText
										disableHighlightBackground
										disableHighlightBorder
										disableHighlightColor1
										disableHighlightColor2
										{...getGroupAttributes(
											attributes,
											'border'
										)}
									/>
								</div>
								<AccordionControl
									isPrimary
									items={[
										deviceType === 'general' && {
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
																'maxi-blocks'
															),
															content: (
																<Fragment>
																	<BackgroundControl
																		{...getGroupAttributes(
																			attributes,
																			[
																				'background',
																				'backgroundColor',
																				'backgroundImage',
																				'backgroundVideo',
																				'backgroundGradient',
																				'backgroundSVG',
																			]
																		)}
																		onChange={obj =>
																			setAttributes(
																				obj
																			)
																		}
																	/>
																	{attributes[
																		'background-active-media'
																	] ===
																		'image' && (
																		<ParallaxControl
																			{...getGroupAttributes(
																				attributes,
																				'parallax'
																			)}
																			onChange={obj =>
																				setAttributes(
																					obj
																				)
																			}
																		/>
																	)}
																</Fragment>
															),
														},
														{
															label: __(
																'Hover',
																'maxi-blocks'
															),
															content: (
																<Fragment>
																	<FancyRadioControl
																		label={__(
																			'Enable Background Hover',
																			'maxi-blocks'
																		)}
																		selected={
																			+attributes[
																				'background-hover-status'
																			]
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
																		onChange={val =>
																			setAttributes(
																				{
																					'background-hover-status': !!+val,
																				}
																			)
																		}
																	/>
																	{attributes[
																		'background-hover-status'
																	] && (
																		<BackgroundControl
																			{...getGroupAttributes(
																				attributes,
																				[
																					'backgroundHover',
																					'backgroundColorHover',
																					'backgroundImageHover',
																					'backgroundVideoHover',
																					'backgroundGradientHover',
																					'backgroundSVGHover',
																				]
																			)}
																			onChange={obj =>
																				setAttributes(
																					obj
																				)
																			}
																			disableImage
																			disableVideo
																			disableSVG
																			isHover
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
																'maxi-blocks'
															),
															content: (
																<BorderControl
																	{...getGroupAttributes(
																		attributes,
																		[
																			'border',
																			'borderWidth',
																			'borderRadius',
																		]
																	)}
																	onChange={obj =>
																		setAttributes(
																			obj
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
																'maxi-blocks'
															),
															content: (
																<Fragment>
																	<FancyRadioControl
																		label={__(
																			'Enable Border Hover',
																			'maxi-blocks'
																		)}
																		selected={
																			+attributes[
																				'border-status-hover'
																			]
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
																			setAttributes(
																				{
																					'border-status-hover': !!+val,
																				}
																			);
																		}}
																	/>
																	{attributes[
																		'border-status-hover'
																	] && (
																		<BorderControl
																			{...getGroupAttributes(
																				attributes,
																				[
																					'borderHover',
																					'borderWidthHover',
																					'borderRadiusHover',
																				]
																			)}
																			onChange={obj =>
																				setAttributes(
																					obj
																				)
																			}
																			breakpoint={
																				deviceType
																			}
																			isHover
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
																'maxi-blocks'
															),
															content: (
																<BoxShadowControl
																	{...getGroupAttributes(
																		attributes,
																		'boxShadow'
																	)}
																	onChange={obj =>
																		setAttributes(
																			obj
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
																'maxi-blocks'
															),
															content: (
																<Fragment>
																	<FancyRadioControl
																		label={__(
																			'Enable Box Shadow Hover',
																			'maxi-blocks'
																		)}
																		selected={
																			+attributes[
																				'box-shadow-status-hover'
																			]
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
																			setAttributes(
																				{
																					'box-shadow-status-hover': !!+val,
																				}
																			);
																		}}
																	/>
																	{attributes[
																		'box-shadow-status-hover'
																	] && (
																		<BoxShadowControl
																			{...getGroupAttributes(
																				attributes,
																				'boxShadowHover'
																			)}
																			onChange={obj =>
																				setAttributes(
																					obj
																				)
																			}
																			breakpoint={
																				deviceType
																			}
																			isHover
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
											label: __(
												'Padding & Margin',
												'maxi-blocks'
											),
											content: (
												<Fragment>
													<AxisControl
														{...getGroupAttributes(
															attributes,
															'padding'
														)}
														label={__(
															'Padding',
															'maxi-blocks'
														)}
														onChange={obj =>
															setAttributes(obj)
														}
														breakpoint={deviceType}
														target='padding'
														disableAuto
													/>
													<AxisControl
														{...getGroupAttributes(
															attributes,
															'margin'
														)}
														label={__(
															'Margin',
															'maxi-blocks'
														)}
														onChange={obj =>
															setAttributes(obj)
														}
														breakpoint={deviceType}
														target='margin'
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
											'Motion Effects',
											'maxi-blocks'
										),
										content: (
											<MotionControl
												{...getGroupAttributes(
													attributes,
													'motion'
												)}
												onChange={obj =>
													setAttributes(obj)
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
											<EntranceAnimationControl
												{...getGroupAttributes(
													attributes,
													'entrance'
												)}
												onChange={obj =>
													setAttributes(obj)
												}
											/>
										),
									},
									{
										label: __('Transform', 'maxi-blocks'),
										content: (
											<TransformControl
												{...getGroupAttributes(
													attributes,
													'transform'
												)}
												onChange={obj =>
													setAttributes(obj)
												}
												uniqueID={uniqueID}
												breakpoint={deviceType}
											/>
										),
									},
									{
										label: __('Display', 'maxi-blocks'),
										content: (
											<DisplayControl
												{...getGroupAttributes(
													attributes,
													'display'
												)}
												onChange={obj =>
													setAttributes(obj)
												}
												breakpoint={deviceType}
											/>
										),
									},
									{
										label: __('Position', 'maxi-blocks'),
										content: (
											<PositionControl
												{...getGroupAttributes(
													attributes,
													'position'
												)}
												onChange={obj =>
													setAttributes(obj)
												}
												breakpoint={deviceType}
											/>
										),
									},
									deviceType !== 'general' && {
										label: __('Breakpoint', 'maxi-blocks'),
										content: (
											<ResponsiveControl
												{...getGroupAttributes(
													attributes,
													'breakpoints'
												)}
												onChange={obj =>
													setAttributes(obj)
												}
												breakpoint={deviceType}
											/>
										),
									},
									{
										label: __('Z-index', 'maxi-blocks'),
										content: (
											<ZIndexControl
												{...getGroupAttributes(
													attributes,
													'zIndex'
												)}
												onChange={obj =>
													setAttributes(obj)
												}
												breakpoint={deviceType}
											/>
										),
									},
									{
										label: __('Opacity', 'maxi-blocks'),
										content: (
											<OpacityControl
												opacity={
													attributes[
														`opacity-${deviceType}`
													]
												}
												defaultOpacity={getDefaultAttribute(
													`opacity-${deviceType}`,
													clientId
												)}
												onChange={val =>
													setAttributes({
														[`opacity-${deviceType}`]: val,
													})
												}
												breakpoint={deviceType}
											/>
										),
									},
								]}
							/>
						),
					},
				]}
			/>
		</InspectorControls>
	);
};

export default Inspector;
