/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ColorControl from '../color-control';
import ClipPathControl from '../clip-path-control';
import ResponsiveTabsControl from '../responsive-tabs-control';
import SizeAndPositionLayerControl from './sizeAndPositionLayerControl';
import {
	getAttributeKey,
	getLastBreakpointAttribute,
	getGroupAttributes,
	getBlockStyle,
	getDefaultAttribute,
} from '../../extensions/styles';
import { getDefaultLayerAttr } from './utils';
import { getPaletteColor } from '../../extensions/style-cards';

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';

const breakpoints = ['general', 'xl', 'l', 'm', 's', 'xs'];

/**
 * Component
 */
const ColorLayerContent = props => {
	const {
		onChange,
		onChangeInline,
		disableClipPath,
		isHover = false,
		prefix = '',
		clientId,
		breakpoint,
		isLayer = false,
		globalProps,
		isToolbar = false,
	} = props;

	const colorOptions = cloneDeep(props.colorOptions);

	const onChangeColor = ({
		color,
		paletteColor,
		paletteStatus,
		paletteOpacity,
	}) => {
		const response = {
			[getAttributeKey(
				'background-palette-status',
				isHover,
				prefix,
				breakpoint
			)]: paletteStatus,
			[getAttributeKey(
				'background-palette-color',
				isHover,
				prefix,
				breakpoint
			)]: paletteColor,
			[getAttributeKey(
				'background-palette-opacity',
				isHover,
				prefix,
				breakpoint
			)]: paletteOpacity,
			[getAttributeKey('background-color', isHover, prefix, breakpoint)]:
				color,
		};

		onChange(response);
	};

	const getDefaultAttr = () => {
		const bgPrefix = `${prefix}background-`;

		if (isLayer) {
			const defaultColor = {};
			const prevBreakpoint =
				breakpoints[breakpoints.indexOf(breakpoint) - 1];

			const getResetValue = target =>
				prevBreakpoint
					? getLastBreakpointAttribute({
							target,
							breakpoint: prevBreakpoint,
							attributes: colorOptions,
							isHover,
					  })
					: getDefaultLayerAttr('colorOptions', target);

			defaultColor.paletteStatus = getResetValue(
				`${bgPrefix}palette-status`
			);
			defaultColor.paletteColor = getResetValue(
				`${bgPrefix}palette-color`
			);
			defaultColor.paletteOpacity = getResetValue(
				`${bgPrefix}palette-opacity`
			);
			defaultColor.color = getResetValue(`${bgPrefix}color`);

			return defaultColor;
		}

		return {
			paletteStatus: getDefaultAttribute(
				`${bgPrefix}palette-status-${breakpoint}`,
				clientId
			),
			paletteColor: getDefaultAttribute(
				`${bgPrefix}palette-color-${breakpoint}`,
				clientId
			),
			paletteOpacity: getDefaultAttribute(
				`${bgPrefix}palette-opacity-${breakpoint}`,
				clientId
			),
			color: getDefaultAttribute(
				`${bgPrefix}color-${breakpoint}`,
				clientId
			),
		};
	};

	const onReset = ({
		showPalette = false,
		paletteStatus,
		paletteColor,
		paletteOpacity,
		color,
	}) => {
		const defaultColorAttr = getDefaultAttr();

		if (showPalette)
			onChangeColor({
				paletteStatus: defaultColorAttr.paletteStatus,
				paletteColor: defaultColorAttr.paletteColor,
				paletteOpacity: paletteOpacity || 1,
				color,
			});
		else {
			const defaultColor = `rgba(${getPaletteColor({
				clientId,
				color: defaultColorAttr.paletteColor,
				blockStyle: getBlockStyle(clientId),
			})},${paletteOpacity || 1})`;

			onChangeColor({
				paletteStatus,
				paletteColor,
				paletteOpacity,
				color: defaultColor,
			});
		}
	};

	return (
		<>
			<ColorControl
				label={__('Background', 'maxi-blocks')}
				color={getLastBreakpointAttribute({
					target: `${prefix}background-color`,
					breakpoint,
					attributes: colorOptions,
					isHover,
				})}
				prefix={`${prefix}background-`}
				defaultColorAttributes={getDefaultAttr()}
				{...(isLayer && { onReset })}
				paletteStatus={getLastBreakpointAttribute({
					target: `${prefix}background-palette-status`,
					breakpoint,
					attributes: colorOptions,
					isHover,
				})}
				paletteColor={getLastBreakpointAttribute({
					target: `${prefix}background-palette-color`,
					breakpoint,
					attributes: colorOptions,
					isHover,
				})}
				paletteOpacity={getLastBreakpointAttribute({
					target: `${prefix}background-palette-opacity`,
					breakpoint,
					attributes: colorOptions,
					isHover,
				})}
				onChangeInline={({ color }) => {
					onChangeInline({
						'background-color': color,
					});
				}}
				onChange={onChangeColor}
				globalProps={globalProps}
				isHover={isHover}
				clientId={clientId}
				deviceType={breakpoint}
				isToolbar={isToolbar}
			/>
			{!disableClipPath && (
				<ClipPathControl
					onChange={onChange}
					{...getGroupAttributes(
						props,
						'clipPath',
						false,
						`${prefix}background-color-`
					)}
					{...colorOptions}
					isHover={isHover}
					prefix={`${prefix}background-color-`}
					breakpoint={breakpoint}
					isLayer
					disableRTC
				/>
			)}
			<SizeAndPositionLayerControl
				prefix={prefix}
				options={colorOptions}
				onChange={onChange}
				isHover={isHover}
				isLayer={isLayer}
				breakpoint={breakpoint}
			/>
		</>
	);
};

const ColorLayer = props => {
	const { breakpoint, disableResponsiveTabs = false, ...rest } = props;

	if (disableResponsiveTabs)
		return <ColorLayerContent breakpoint={breakpoint} {...rest} />;

	return (
		<ResponsiveTabsControl breakpoint={breakpoint}>
			<ColorLayerContent {...rest} />
		</ResponsiveTabsControl>
	);
};

export default ColorLayer;
