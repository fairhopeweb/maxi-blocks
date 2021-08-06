/**
 * WordPress dependencies
 */
import { select } from '@wordpress/data';

/**
 * External dependencies
 */
import { isNil, isEmpty, isBoolean, isNumber, uniq } from 'lodash';

/**
 * Breakpoints
 */
const breakpoints = ['general', 'xxl', 'xl', 'l', 'm', 's', 'xs'];

/**
 * Gets an object base on Maxi Blocks breakpoints schema and looks for the last set value
 * for a concrete property in case is not set for the requested breakpoint
 */
const getLastBreakpointAttributeSingle = (
	target,
	breakpoint,
	attributes,
	isHover,
	avoidXXL
) => {
	const { getBlockAttributes, getSelectedBlockClientId } =
		select('core/block-editor');

	const attr = attributes || getBlockAttributes(getSelectedBlockClientId());

	if (isNil(attr)) return false;

	let currentAttr = !isNil(
		attr[`${target}-${breakpoint}${isHover ? '-hover' : ''}`]
	)
		? attr[`${target}-${breakpoint}${isHover ? '-hover' : ''}`]
		: attr[`${target}-${breakpoint}`];

	if (
		!isNil(currentAttr) &&
		(isNumber(currentAttr) ||
			isBoolean(currentAttr) ||
			!isEmpty(currentAttr))
	)
		return currentAttr;

	let breakpointPosition = breakpoints.indexOf(breakpoint);

	do {
		breakpointPosition -= 1;
		if (!(avoidXXL && breakpoints[breakpointPosition] === 'xxl'))
			currentAttr =
				attr[
					`${target}-${breakpoints[breakpointPosition]}${
						isHover ? '-hover' : ''
					}`
				];
	} while (
		breakpointPosition > 0 &&
		!isNumber(currentAttr) &&
		(isEmpty(currentAttr) || isNil(currentAttr))
	);

	return currentAttr;
};

const getLastBreakpointAttributeGroup = (
	target,
	breakpoint,
	isHover,
	avoidXXL
) => {
	const { getSelectedBlockClientIds, getBlockAttributes } =
		select('core/block-editor');

	const clientIds = getSelectedBlockClientIds();

	const values = clientIds.map(clientId => {
		const attributes = getBlockAttributes(clientId);

		return getLastBreakpointAttributeSingle(
			target,
			breakpoint,
			attributes,
			isHover,
			avoidXXL
		);
	});

	const flattenValues = uniq(values);
	if (flattenValues.length === 1) return flattenValues[0];

	return null;
};

const getLastBreakpointAttribute = (
	target,
	breakpoint,
	attributes = null,
	isHover = false,
	forceSingle = false,
	avoidXXL = false
) => {
	const { getSelectedBlockCount } = select('core/block-editor');

	if (getSelectedBlockCount() > 1 && !forceSingle)
		return getLastBreakpointAttributeGroup(
			target,
			breakpoint,
			isHover,
			avoidXXL
		);

	return getLastBreakpointAttributeSingle(
		target,
		breakpoint,
		attributes,
		isHover,
		avoidXXL
	);
};

export default getLastBreakpointAttribute;
