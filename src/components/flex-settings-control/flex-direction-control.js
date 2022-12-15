/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import { getLastBreakpointAttribute } from '../../extensions/styles';
import SettingTabsControl from '../setting-tabs-control';
import Icon from '../icon';


/**
 * Icons
 */
import {
	flexDirectionRow,
	flexDirectionColumn,
	flexDirectionRowReverse,
    flexDirectionColumnReverse,
} from '../../icons';


/**
 * Component
 */

const FlexDirectionControl = props => {
	const { breakpoint, onChange } = props;

	const getOptions = () => {
		const options = [];

			options.push({
				icon: <Icon icon={flexDirectionRow} />,
				value: 'row',
			});

			options.push({
				icon: (
					<Icon icon={flexDirectionColumn} />
				),
				value: 'column',
			});

			options.push({
				icon: (
					<Icon icon={flexDirectionRowReverse} />
				),
                value: 'row-reverse',
			});

			options.push({
				icon: (
					<Icon icon={flexDirectionColumnReverse} />
				),
				value: 'column-reverse',
			});

		return options;
	};

	return (
		<SettingTabsControl
			label={__('Flex direction', 'maxi-blocks')}
			type='buttons'
			fullWidthMode
			className='maxi-flex__direction'
			hasBorder
			items={getOptions()}
			value={
				getLastBreakpointAttribute({
					target: 'flex-direction',
					breakpoint,
					attributes: props,
				}) ?? ''
			}
			selected={
				getLastBreakpointAttribute({
					target: 'flex-direction',
					breakpoint,
					attributes: props,
				}) || getOptions()[0].value
			}
			onChange={val =>
				onChange({
					[`flex-direction-${breakpoint}`]: val,
				})
			}
		/>
	);
};

export default FlexDirectionControl;
