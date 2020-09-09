/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { RadioControl } = wp.components;

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isObject } from 'lodash';

/**
 * Component
 */
const DisplayControl = props => {
	const {
		display,
		className,
		onChange,
		breakpoint,
		defaultDisplay = 'inherit',
	} = props;

	const value = !isObject(display) ? JSON.parse(display) : display;

	const classes = classnames('maxi-display-control', className);

	const isHide = () => {
		const objectKeys = Object.keys(value);
		const breakpointIndex = objectKeys.indexOf(breakpoint) - 1;

		if (breakpointIndex === 0) return false;

		let i = breakpointIndex;

		do {
			if (value[objectKeys[i]].display === 'none') return true;
			if (value[objectKeys[i]].display === defaultDisplay) return false;
			i -= 1;
		} while (i > 0);

		return false;
	};

	const getValue = () => {
		const isPrevHide = isHide();

		return isPrevHide && value[breakpoint].display === ''
			? 'none'
			: value[breakpoint].display;
	};

	const getOptions = () => {
		const isPrevHide = isHide();

		if (isPrevHide)
			return [
				{ label: __('Show', 'maxi-blocks'), value: defaultDisplay },
				{ label: __('Hide', 'maxi-blocks'), value: 'none' },
			];
		return [
			{ label: __('Show', 'maxi-blocks'), value: '' },
			{ label: __('Hide', 'maxi-blocks'), value: 'none' },
		];
	};
	return (
		<div className='maxi-fancy-radio-control'>
			<div className={classes}>
				<RadioControl
					label={__('Display block', 'maxi-blocks')}
					selected={getValue()}
					options={getOptions()}
					onChange={val => {
						value[breakpoint].display = val;
						onChange(JSON.stringify(value));
					}}
				/>
			</div>
		</div>
	);
};

export default DisplayControl;
