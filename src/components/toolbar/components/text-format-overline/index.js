/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, Button, Tooltip } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import {
	setFormat,
	getCustomFormatValue,
} from '../../../../extensions/text/formats';

/**
 * External dependencies
 */
import { trim } from 'lodash';

/**
 * Styles and icons
 */
import { toolbarOverline } from '../../../../icons';
import { getGroupAttributes } from '../../../../extensions/styles';

/**
 * TextFormatOverline
 */
const TextFormatOverline = props => {
	const { formatValue, onChange, isList, breakpoint, textLevel } = props;

	const getTextDecorationValue = () => {
		return (
			getCustomFormatValue({
				typography: { ...getGroupAttributes(props, 'typography') },
				formatValue,
				prop: 'text-decoration',
				breakpoint,
			}) || ''
		);
	};

	const textDecorationValue = getTextDecorationValue();

	const [isActive, setIsActive] = useState(
		textDecorationValue.indexOf('overline') >= 0
	);

	useEffect(() => {
		const textDecorationValue = getTextDecorationValue();

		setIsActive(textDecorationValue.indexOf('overline') >= 0);
	});

	const onClick = () => {
		const textDecorationValue = getTextDecorationValue();

		let response;

		if (textDecorationValue === 'none') response = 'overline';
		else
			response =
				textDecorationValue.indexOf('overline') >= 0
					? textDecorationValue.replace('overline', '')
					: `${textDecorationValue} overline`;

		response = trim(response);

		const obj = setFormat({
			formatValue,
			isActive: textDecorationValue.indexOf('overline') >= 0,
			isList,
			typography: { ...getGroupAttributes(props, 'typography') },
			value: {
				'text-decoration': response,
			},
			breakpoint,
			textLevel,
		});

		setIsActive(!isActive);

		onChange(obj);
	};

	return (
		<Tooltip text={__('Overline', 'maxi-blocks')} position='bottom center'>
			<Button
				className='toolbar-item toolbar-item__overline'
				onClick={onClick}
				aria-pressed={isActive}
			>
				<Icon className='toolbar-item__icon' icon={toolbarOverline} />
			</Button>
		</Tooltip>
	);
};

export default TextFormatOverline;
