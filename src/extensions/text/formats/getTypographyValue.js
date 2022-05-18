/**
 * Internal dependencies
 */
import { getLastBreakpointAttribute } from '../../styles';
import getCustomFormatValue from './getCustomFormatValue';

/**
 * External dependencies
 */
import { isBoolean, isNumber } from 'lodash';

const getTypographyValue = ({
	disableFormats = false,
	prop,
	breakpoint,
	typography,
	isHover,
	avoidXXL,
	formatValue,
	textLevel,
	styleCard,
	styleCardPrefix,
	avoidSC = false,
	prefix = '',
}) => {
	if (disableFormats)
		return getLastBreakpointAttribute({
			target: prop,
			breakpoint,
			attributes: typography,
			isHover,
			avoidXXL,
		});

	const nonHoverValue =
		getCustomFormatValue({
			typography,
			formatValue,
			prop,
			breakpoint,
			textLevel,
			styleCard,
			styleCardPrefix,
			avoidXXL,
			avoidSC,
		}) ??
		// In cases like HoverEffectControl, where we want the SC 'p' value
		// but requires a clean 'prop' value (no prefix)
		getCustomFormatValue({
			typography,
			formatValue,
			prop: prop.replace(prefix, ''),
			breakpoint,
			textLevel,
			styleCard,
			styleCardPrefix,
			avoidXXL,
			avoidSC,
		});

	if (!isHover) return nonHoverValue;

	const hoverValue = getCustomFormatValue({
		typography,
		formatValue,
		prop,
		breakpoint,
		isHover,
		textLevel,
		styleCard,
		styleCardPrefix,
	});

	if (hoverValue || isBoolean(hoverValue) || isNumber(hoverValue))
		return hoverValue;

	return nonHoverValue;
};

export default getTypographyValue;
