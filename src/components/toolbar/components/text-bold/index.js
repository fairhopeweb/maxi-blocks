/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Icon, Button, Tooltip } = wp.components;

/**
 * Internal dependencies
 */
import {
	getCustomFormatValue,
	setFormat,
} from '../../../../extensions/text/formats';

/**
 * Styles and icons
 */
import './editor.scss';
import { toolbarBold } from '../../../../icons';

/**
 * TextBold
 */
const TextBold = props => {
	const { formatValue, blockName, onChange, isList, breakpoint } = props;

	if (blockName !== 'maxi-blocks/text-maxi') return null;

	const typography = { ...props.typography };

	const boldValue = getCustomFormatValue({
		typography,
		formatValue,
		prop: 'font-weight',
		breakpoint,
	});

	const isActive = (boldValue > 400 && true) || false;

	const onClick = () => {
		const { typography: newTypography, content: newContent } = setFormat({
			formatValue,
			isActive,
			isList,
			typography,
			value: {
				'font-weight': (isActive && 400) || 800,
			},
			breakpoint,
			// isHover,
		});

		onChange({
			typography: newTypography,
			...(newContent && { content: newContent }),
		});
	};

	return (
		<Tooltip text={__('Bold', 'maxi-blocks')} position='bottom center'>
			<Button
				className='toolbar-item toolbar-item__bold'
				onClick={onClick}
				aria-pressed={isActive}
			>
				<Icon className='toolbar-item__icon' icon={toolbarBold} />
			</Button>
		</Tooltip>
	);
};

export default TextBold;
