/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import BoxShadowControl from '../../../box-shadow-control';
import ToolbarPopover from '../toolbar-popover';
import { getGroupAttributes } from '../../../../extensions/styles';

/**
 * Icons
 */
import './editor.scss';
import { toolbarDropShadow } from '../../../../icons';

/**
 * BoxShadow
 */
const ALLOWED_BLOCKS = [
	'maxi-blocks/button-maxi',
	'maxi-blocks/image-maxi',
	'maxi-blocks/divider-maxi',
	'maxi-blocks/section-maxi',
	'maxi-blocks/svg-icon-maxi',
];

const BoxShadow = props => {
	const { blockName, onChange, breakpoint } = props;

	if (!ALLOWED_BLOCKS.includes(blockName)) return null;

	return (
		<ToolbarPopover
			className='toolbar-item__box-shadow'
			tooltip={__('Drop shadow', 'maxi-blocks')}
			icon={toolbarDropShadow}
			advancedOptions='box shadow'
			content={
				<div className='toolbar-item__box-shadow__popover'>
					<BoxShadowControl
						{...getGroupAttributes(props, 'boxShadow')}
						onChange={obj => onChange(obj)}
						breakpoint={breakpoint}
						disableAdvanced
					/>
				</div>
			}
		/>
	);
};

export default BoxShadow;
