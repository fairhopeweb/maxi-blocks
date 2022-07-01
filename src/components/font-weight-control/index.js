/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import SelectControl from '../select-control';
import { getWeightOptions } from '../typography-control/utils';
import { loadFontsInEditor } from '../../extensions/text/fonts';

const FontWeightControl = props => {
	const { onChange, fontName, fontStyle, fontWeight, breakpoint } = props;

	return (
		<SelectControl
			label={__('Font weight', 'maxi-blocks')}
			className='maxi-typography-control__weight'
			value={fontWeight}
			options={getWeightOptions(fontName)}
			onChange={val => {
				onChange(val);
				const objFont = { [fontName]: {} };

				objFont[fontName].weight = val.toString();
				if (fontStyle) objFont[fontName].style = fontStyle;

				loadFontsInEditor(breakpoint, objFont);
			}}
		/>
	);
};
export default FontWeightControl;
