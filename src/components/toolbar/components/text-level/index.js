/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import FontLevelControl from '../../../font-level-control';
import ToolbarPopover from '../toolbar-popover';

/**
 * Styles and icons
 */
import './editor.scss';
import {
	toolbarH1,
	toolbarH2,
	toolbarH3,
	toolbarH4,
	toolbarH5,
	toolbarH6,
	toolbarP,
} from '../../../../icons';

/**
 * TextLevel
 */
const TextLevel = props => {
	const {
		blockName,
		textLevel,
		typography,
		typographyHover,
		margin,
		isList,
		onChange,
	} = props;

	if (blockName !== 'maxi-blocks/text-maxi' || isList) return null;

	const levelIcon = textLevel => {
		switch (textLevel) {
			case 'h1':
				return toolbarH1;
			case 'h2':
				return toolbarH2;
			case 'h3':
				return toolbarH3;
			case 'h4':
				return toolbarH4;
			case 'h5':
				return toolbarH5;
			case 'h6':
				return toolbarH6;
			case 'p':
				return toolbarP;
			default:
				return toolbarP;
		}
	};

	return (
		<ToolbarPopover
			className='toolbar-item__text-level'
			tooltip={__('Text level', 'maxi-blocks')}
			icon={levelIcon(textLevel)}
			content={
				<FontLevelControl
					value={textLevel}
					onChange={obj => onChange(obj)}
					fontOptions={typography}
					fontOptionsHover={typographyHover}
				/>
			}
		/>
	);
};

export default TextLevel;
