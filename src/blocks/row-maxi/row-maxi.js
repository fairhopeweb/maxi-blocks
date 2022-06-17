/**
 * BLOCK: maxi-blocks/row-maxi
 *
 * Container for columns in order to create webpage structures
 */

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Styles and icons
 */
import './style.scss';
import './editor.scss';
import { rowIcon } from '../../icons';

/**
 * Block dependencies
 */
import attributes from './attributes';
import edit from './edit';
import save from './save';
import positionMigrator from '../../extensions/styles/migrators/positionMigrator';
import fromFullWidthNonToResponsive from '../../extensions/styles/migrators/fullWidthNonToResponsive';

/**
 * Block
 */

registerBlockType('maxi-blocks/row-maxi', {
	title: __('Row Maxi', 'maxi-blocks'),
	icon: rowIcon,
	description: 'Configure columns inside a row',
	category: 'maxi-blocks',
	parent: ['maxi-blocks/container-maxi'],
	supports: {
		align: true,
		lightBlockWrapper: true,
	},
	attributes: {
		...attributes,
	},
	getEditWrapperProps(attributes) {
		const { uniqueID } = attributes;

		return {
			uniqueid: uniqueID,
		};
	},
	edit,
	save,
	deprecated: [
		positionMigrator({ attributes, save }),
		fromFullWidthNonToResponsive({ attributes, save }),
	],
});
