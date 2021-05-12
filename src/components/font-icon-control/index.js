/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import * as defaultPresets from './defaults';
import AxisControl from '../axis-control';
import BorderControl from '../border-control';
import ColorControl from '../color-control';
import FancyRadioControl from '../fancy-radio-control';
import FontIconPicker from '../font-icon-picker';
import GradientControl from '../gradient-control';
import Icon from '../icon';
import SettingTabsControl from '../setting-tabs-control';
import SizeControl from '../size-control';
import {
	getGroupAttributes,
	getLastBreakpointAttribute,
	getDefaultAttribute,
} from '../../extensions/styles';

/**
 * Styles and icons
 */
import './editor.scss';
import {
	backgroundColor,
	solid,
	backgroundGradient,
	fontIconSettings,
	presetThree,
	presetSeven,
	presetEight,
} from '../../icons';
import DefaultStylesControl from '../default-styles-control';

/**
 * Component
 */
const FontIconControl = props => {
	const {
		className,
		onChange,
		breakpoint,
		simpleMode = false,
		disableColor,
		clientId,
	} = props;

	const [activeOption, setActiveOption] = useState('iconColor');

	const classes = classnames('maxi-font-icon-control', className);

	const getOptions = () => {
		const options = [];

		options.push({
			label: <Icon icon={fontIconSettings} />,
			value: 'iconColor',
		});

		!simpleMode &&
			options.push({
				label: <Icon icon={backgroundColor} />,
				value: 'backgroundColor',
			});

		!simpleMode &&
			options.push({
				label: <Icon icon={backgroundGradient()} />,
				value: 'backgroundGradient',
			});

		!simpleMode &&
			options.push({
				label: <Icon icon={solid} />,
				value: 'border',
			});

		return options;
	};

	const onChangePreset = number => {
		onChange({ ...defaultPresets[`preset${number}`] });
	};

	return (
		<div className={classes}>
			<FontIconPicker
				iconClassName={props['icon-name']}
				onChange={val =>
					onChange({
						'icon-name': val,
					})
				}
			/>
			{!isEmpty(props['icon-name']) && (
				<Fragment>
					<SizeControl
						label={__('Size', 'maxi-blocks')}
						unit={getLastBreakpointAttribute(
							'icon-size-unit',
							breakpoint,
							props
						)}
						onChangeUnit={val =>
							onChange({
								[`icon-size-unit-${breakpoint}`]: val,
							})
						}
						value={getLastBreakpointAttribute(
							'icon-size',
							breakpoint,
							props
						)}
						onChangeValue={val =>
							onChange({
								[`icon-size-${breakpoint}`]: val,
							})
						}
						onReset={() =>
							onChange({
								[`icon-size-${breakpoint}`]: getDefaultAttribute(
									`icon-size-${breakpoint}`
								),
								[`icon-size-unit-${breakpoint}`]: getDefaultAttribute(
									`icon-size-unit-${breakpoint}`
								),
							})
						}
						minMaxSettings={{
							px: {
								min: 0,
								max: 300,
							},
							em: {
								min: 0,
								max: 300,
							},
							vw: {
								min: 0,
								max: 100,
							},
							'%': {
								min: 0,
								max: 100,
							},
						}}
					/>

					{!simpleMode && (
						<Fragment>
							<SizeControl
								label={__('Spacing', 'maxi-blocks')}
								disableUnit
								value={props['icon-spacing']}
								onChangeValue={val =>
									onChange({
										'icon-spacing': val,
									})
								}
								onReset={() =>
									onChange({
										'icon-spacing': getDefaultAttribute(
											'icon-spacing'
										),
									})
								}
								min={0}
								max={99}
							/>

							<FancyRadioControl
								label={__('Icon Position', 'maxi-blocks')}
								selected={props['icon-position']}
								options={[
									{
										label: __('Left', 'maxi-blocks'),
										value: 'left',
									},
									{
										label: __('Right', 'maxi-blocks'),
										value: 'right',
									},
								]}
								optionType='string'
								onChange={val =>
									onChange({ 'icon-position': val })
								}
							/>
						</Fragment>
					)}

					{!simpleMode && (
						<DefaultStylesControl
							className='maxi-icon-default-styles'
							items={[
								{
									activeItem: false,
									content: <Icon icon={presetSeven} />,
									onChange: () => onChangePreset(1),
								},
								{
									activeItem: false,
									content: <Icon icon={presetThree} />,
									onChange: () => onChangePreset(2),
								},
								{
									activeItem: false,
									content: <Icon icon={presetEight} />,
									onChange: () => onChangePreset(3),
								},
							]}
						/>
					)}
					{getOptions().length > 1 && (
						<FancyRadioControl
							label=''
							selected={activeOption}
							options={getOptions()}
							fullWidthMode
							optionType='string'
							onChange={item => {
								if (item === 'iconColor')
									setActiveOption('iconColor');
								if (item === 'backgroundColor') {
									onChange({
										'icon-background-active-media': 'color',
									});
									setActiveOption('backgroundColor');
								}
								if (item === 'backgroundGradient') {
									onChange({
										'icon-background-active-media':
											'gradient',
									});
									setActiveOption('backgroundGradient');
								}
								if (item === 'border')
									setActiveOption('border');
							}}
						/>
					)}

					{activeOption === 'iconColor' && !disableColor && (
						<SettingTabsControl
							items={[
								{
									label: __('Normal', 'maxi-blocks'),
									content: (
										<ColorControl
											label={__('Icon', 'maxi-blocks')}
											color={props['icon-color']}
											defaultColor={getDefaultAttribute(
												'icon-color'
											)}
											onChange={val =>
												onChange({ 'icon-color': val })
											}
											showPalette
											palette={{
												...getGroupAttributes(
													props,
													'palette'
												),
											}}
											colorPaletteType='icon'
											onChangePalette={val =>
												onChange(val)
											}
											clientId={clientId}
										/>
									),
								},
								{
									label: __('Hover', 'maxi-blocks'),
									content: (
										<>
											<FancyRadioControl
												label={__(
													'Enable Icon Hover',
													'maxi-blocks'
												)}
												selected={
													props['icon-status-hover']
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
													onChange({
														'icon-status-hover': val,
													})
												}
											/>
											{props['icon-status-hover'] && (
												<ColorControl
													label={__(
														'Icon Hover',
														'maxi-blocks'
													)}
													color={
														props[
															'icon-color-hover'
														]
													}
													defaultColor={getDefaultAttribute(
														'icon-color-hover'
													)}
													onChange={val =>
														onChange({
															'icon-color-hover': val,
														})
													}
													showPalette
													isHover
													palette={{
														...getGroupAttributes(
															props,
															'palette'
														),
													}}
													colorPaletteType='icon'
													onChangePalette={val =>
														onChange(val)
													}
													clientId={clientId}
												/>
											)}
										</>
									),
								},
							]}
						/>
					)}

					{!simpleMode && activeOption === 'border' && (
						<BorderControl
							{...getGroupAttributes(props, [
								'iconBorder',
								'iconBorderWidth',
								'iconBorderRadius',
							])}
							onChange={obj => onChange(obj)}
							breakpoint={breakpoint}
							prefix='icon-'
						/>
					)}

					{!simpleMode && activeOption === 'backgroundColor' && (
						<ColorControl
							label={__('Background', 'maxi-blocks')}
							color={props['icon-background-color']}
							defaultColor={getDefaultAttribute(
								'icon-background-color'
							)}
							onChange={val =>
								onChange({ 'icon-background-color': val })
							}
						/>
					)}

					{!simpleMode && activeOption === 'backgroundGradient' && (
						<GradientControl
							label={__('Background', 'maxi-blocks')}
							gradient={props['icon-background-gradient']}
							gradientOpacity={
								props['icon-background-gradient-opacity']
							}
							defaultGradient={getDefaultAttribute(
								'icon-background-gradient'
							)}
							onChange={val =>
								onChange({
									'icon-background-gradient': val,
								})
							}
							onChangeOpacity={val =>
								onChange({
									'icon-background-gradient-opacity': val,
								})
							}
						/>
					)}

					{!simpleMode && (
						<FancyRadioControl
							label={__('Use Custom Padding', 'maxi-blocks')}
							selected={props['icon-custom-padding']}
							options={[
								{
									label: __('No', 'maxi-blocks'),
									value: 0,
								},
								{
									label: __('Yes', 'maxi-blocks'),
									value: 1,
								},
							]}
							onChange={val =>
								onChange({ 'icon-custom-padding': val })
							}
						/>
					)}

					{!simpleMode && props['icon-custom-padding'] && (
						<AxisControl
							{...getGroupAttributes(props, 'iconPadding')}
							onChange={obj => onChange(obj)}
							target='icon-padding'
							breakpoint={breakpoint}
							disableAuto
						/>
					)}
				</Fragment>
			)}
		</div>
	);
};

export default FontIconControl;
