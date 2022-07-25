/**
 * Internal dependencies
 */
import breakpointAttributesCreator from '../breakpointAttributesCreator';
import getBreakpointFromAttribute from '../getBreakpointFromAttribute';
import getBlockCategoriesAndSelectors from '../../../components/relation-control/getBlockCategoriesAndSelectors';

/**
 * External dependencies
 */
import { isEmpty, isNil } from 'lodash';

const types = ['scale', 'translate', 'rotate', 'origin'];

const attributes = breakpointAttributesCreator({
	obj: {
		'transform-scale-x': {
			type: 'number',
		},
		'transform-scale-y': {
			type: 'number',
		},
		'transform-translate-x-unit': {
			type: 'string',
			default: '%',
		},
		'transform-translate-x': {
			type: 'number',
		},
		'transform-translate-y-unit': {
			type: 'string',
			default: '%',
		},
		'transform-translate-y': {
			type: 'number',
		},
		'transform-rotate-x': {
			type: 'number',
		},
		'transform-rotate-y': {
			type: 'number',
		},
		'transform-rotate-z': {
			type: 'number',
		},
		'transform-origin-x': {
			type: 'string',
		},
		'transform-origin-y': {
			type: 'string',
		},
		'transform-origin-x-unit': {
			type: 'string',
			default: '%',
		},
		'transform-origin-y-unit': {
			type: 'string',
			default: '%',
		},
	},
});

const isEligible = blockAttributes =>
	Object.keys(blockAttributes).some(key => key in attributes) ||
	(!!blockAttributes.relations &&
		blockAttributes.relations.some(relation =>
			Object.keys(relation.attributes).some(key => key in attributes)
		));

const migrate = ({ newAttributes, selectors }) => {
	if (isEmpty(selectors)) return false;

	const getAxis = attribute => attribute.match(/[x,y,z](-unit)?/)[0];

	const target = Object.entries(selectors).find(
		([key, selector]) => selector.normal.target === ''
	)[0];

	const updateAttribute = (key, attr) => {
		types.every(type => {
			if (
				key.match(type) &&
				!isNil(attr) &&
				attr !== attributes[key].default
			) {
				const breakpoint = getBreakpointFromAttribute(key);
				newAttributes[`transform-${type}-${breakpoint}`] = {
					[`${target}`]: {
						normal: {
							...newAttributes[
								`transform-${type}-${breakpoint}`
							]?.[`${target}`]?.normal,
							[getAxis(key)]: attr,
						},
					},
				};

				return false;
			}
			return true;
		});

		delete newAttributes[key];
	};

	Object.entries(newAttributes).forEach(([key, attr]) => {
		if (key in attributes) {
			updateAttribute(key, attr);
		}
		if (key === 'relations' && !isNil(attr)) {
			const newRelations = [...attr];
			attr.forEach((relation, index) => {
				const newRelationAttributes = { ...relation.attributes };
				const name = relation.uniqueID.split('-')[0];
				const { selectors: relationSelectors } =
					getBlockCategoriesAndSelectors(name);

				migrate({
					newAttributes: newRelationAttributes,
					selectors: relationSelectors,
				});

				newRelations[index] = {
					...newRelations[index],
					attributes: newRelationAttributes,
				};
			});

			newAttributes[key] = newRelations;
		}
	});

	return newAttributes;
};

export default { attributes: () => attributes, migrate, isEligible };
