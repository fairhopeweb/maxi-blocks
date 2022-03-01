/**
 * WordPress dependencies
 */
import { getBlockAttributes } from '@wordpress/blocks';
import { select } from '@wordpress/data';

const getIsActiveTab = (
	attributes,
	breakpoint,
	extraIndicators = [],
	extraIndicatorsResponsive = []
) => {
	const { getBlock, getSelectedBlockClientId } = select('core/block-editor');

	const block = getBlock(getSelectedBlockClientId());

	if (!block) return null;

	const { name, attributes: currentAttributes } = block;

	if (!name.includes('maxi-blocks')) return null;

	const defaultAttributes = getBlockAttributes(name);

	const excludedAttributes = [
		'blockStyle',
		'parentBlockStyle',
		'isFirstOnHierarchy',
		'uniqueID',
	];

	return ![
		...attributes,
		...extraIndicators,
		...extraIndicatorsResponsive,
	].every(attribute => {
		if (excludedAttributes.includes(attribute)) return true;
		if (!(attribute in defaultAttributes)) return true;

		if (currentAttributes[attribute] === undefined) return true;
		if (
			attribute.includes('scroll-') &&
			currentAttributes[attribute] === false
		)
			return true;

		if (breakpoint) {
			if (
				attribute.lastIndexOf(`-${breakpoint}`) ===
				attribute.length - `-${breakpoint}`.length
			)
				return (
					currentAttributes[attribute] ===
					defaultAttributes[attribute]
				);
		} else
			return (
				currentAttributes[attribute] === defaultAttributes[attribute]
			);

		return true;
	});
};

export default getIsActiveTab;
