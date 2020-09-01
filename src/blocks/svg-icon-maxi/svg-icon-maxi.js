/**
 * BLOCK: maxi-blocks/image-maxi
 *
 * Registering an image block with Gutenberg.
 * Shows an image and a description. A test block.
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block dependencies
 */
import attributes from './attributes.js';
import edit from './edit.js';
import save from './save.js';

/**
 * Styles and icons
 */
import './style.scss';
import './editor.scss';
import { iconBox } from '../../icons';

/**
 * Block
 */
registerBlockType( 'maxi-blocks/svg-icon-maxi', {
	title: __('SVG Icon Maxi', 'maxi-blocks'),
	icon: iconBox,
	description: "Insert, modify or style SVG icons",
	category: 'maxi-blocks',
	supports: {
		align: true,
		lightBlockWrapper: true
    },
	attributes: {
		...attributes
	},
	getEditWrapperProps(attributes) {
        const {
			uniqueID
        } = attributes;

        return {
			'uniqueid': uniqueID
        };
    },
	edit,
	save
} );