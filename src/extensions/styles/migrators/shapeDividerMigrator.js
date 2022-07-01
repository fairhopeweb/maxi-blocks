/**
 * Internal dependencies
 */
import paletteAttributesCreator from '../paletteAttributesCreator';

const deprecatedAttributes = {
	'shape-divider-top-height': {
		type: 'number',
		default: 100,
	},
	'shape-divider-top-height-unit': {
		type: 'string',
		default: 'px',
	},
	'shape-divider-bottom-height': {
		type: 'number',
		default: 100,
	},
	'shape-divider-bottom-height-unit': {
		type: 'string',
		default: 'px',
	},
	...paletteAttributesCreator({ prefix: 'shape-divider-top-', palette: 5 }),
	...paletteAttributesCreator({
		prefix: 'shape-divider-bottom-',
		palette: 5,
	}),
	'shape-divider-top-opacity': {
		type: 'number',
		default: 1,
	},
	'shape-divider-bottom-opacity': {
		type: 'number',
		default: 1,
	},
};

const migrate = newAttributes => {
	Object.entries(newAttributes).forEach(([key, attr]) => {
		if (key in deprecatedAttributes) {
			newAttributes[`${key}-general`] = attr;

			delete newAttributes[key];
		}
	});
};

const isEligible = blockAttributes =>
	Object.keys(blockAttributes).some(
		key =>
			key in deprecatedAttributes &&
			blockAttributes[key] !== deprecatedAttributes[key].default
	);

const shapeDividerMigrator = ({ attributes, save }) => {
	return {
		isEligible,
		attributes: {
			...attributes,
			...deprecatedAttributes,
		},
		migrate: oldAttributes => {
			const newAttributes = { ...oldAttributes };

			migrate(newAttributes);

			return newAttributes;
		},
		save: props => save(props),
	};
};

export { shapeDividerMigrator, isEligible, deprecatedAttributes, migrate };
