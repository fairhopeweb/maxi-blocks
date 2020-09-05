/**
 * BLOCK: maxi-blocks/divider-maxi
 *
 * Registering an divider block with Gutenberg.
 * Shows an divider and a description. A test block.
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block dependencies
 */
import attributes from './attributes';
import edit from './edit';
import save from './save';

/**
 * Styles and icons
 */
import './style.scss';
import './editor.scss';
import { dividerIcon } from '../../icons';

/**
 * Block
 */
registerBlockType('maxi-blocks/divider-maxi', {
	title: __('Divider Maxi', 'maxi-blocks'),
	icon: dividerIcon,
	description: 'Create a horizontal divider between visual elements',
	category: 'maxi-blocks',
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
});
