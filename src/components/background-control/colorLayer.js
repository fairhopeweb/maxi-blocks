/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ColorControl from '../color-control';
import ClipPath from '../clip-path-control';
import {
	getDefaultAttribute,
	getAttributeKey,
	getGroupAttributes,
} from '../../extensions/styles';

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';

/**
 * Component
 */
const ColorLayer = props => {
	const { onChange, disableClipPath, isHover, prefix, clientId, type } =
		props;

	const colorOptions = cloneDeep(props.colorOptions);

	return (
		<>
			<ColorControl
				label={__('Background', 'maxi-blocks')}
				color={
					colorOptions[
						getAttributeKey('background-color', isHover, prefix)
					]
				}
				defaultColor={getDefaultAttribute(
					getAttributeKey('background-color', isHover, prefix)
				)}
				onChange={val => {
					colorOptions[
						getAttributeKey('background-color', isHover, prefix)
					] = val;

					onChange(colorOptions);
				}}
				disablePalette={type === 'layer'}
				showPalette
				palette={{ ...getGroupAttributes(props, 'palette') }}
				isHover={isHover}
				colorPaletteType={`${prefix}background`}
				onChangePalette={val => onChange(val)}
				clientId={clientId}
			/>
			{!disableClipPath && (
				<ClipPath
					clipPath={
						colorOptions[
							getAttributeKey(
								'background-color-clip-path',
								isHover,
								prefix
							)
						]
					}
					onChange={val => {
						colorOptions[
							getAttributeKey(
								'background-color-clip-path',
								isHover,
								prefix
							)
						] = val;

						onChange(colorOptions);
					}}
				/>
			)}
		</>
	);
};

export default ColorLayer;
