/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import AlignmentControl from '../../../alignment-control';
import ToolbarPopover from '../toolbar-popover';

/**
 * Icons
 */
import './editor.scss';
import { toolbarAlign } from '../../../../icons';

/**
 * Alignment
 */
const ALLOWED_BLOCKS = [
	'maxi-blocks/text-maxi',
	'maxi-blocks/button-maxi',
	'maxi-blocks/image-maxi',
];

const Alignment = props => {
	const { blockName, alignment, onChange, breakpoint } = props;

	if (!ALLOWED_BLOCKS.includes(blockName)) return null;

	return (
		<ToolbarPopover
			className='toolbar-item__alignment'
			tooltip={__('Alignment', 'maxi-blocks')}
			icon={toolbarAlign}
			content={
				<AlignmentControl
					alignment={alignment}
					onChange={alignment => onChange(alignment)}
					disableJustify={
						!(
							blockName === 'maxi-blocks/text-maxi' ||
							blockName === 'maxi-blocks/button-maxi'
						)
					}
					breakpoint={breakpoint}
				/>
			}
		/>
	);
};

export default Alignment;
