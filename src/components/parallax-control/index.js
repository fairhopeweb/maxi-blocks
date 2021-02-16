/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import FancyRadioControl from '../fancy-radio-control';
import RangeSliderControl from '../range-slider-control';
import { getDefaultAttribute } from '../../extensions/styles';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil } from 'lodash';

/**
 * Component
 */
const ParallaxControl = props => {
	const { className, onChange } = props;

	const classes = classnames('maxi-parallax-control', className);

	return (
		<div className={classes}>
			<FancyRadioControl
				label={__('Use Parallax Effect', 'maxi-blocks')}
				selected={+props['parallax-status']}
				options={[
					{ label: __('Yes', 'maxi-blocks'), value: 1 },
					{ label: __('No', 'maxi-blocks'), value: 0 },
				]}
				onChange={val => onChange({ 'parallax-status': !!val })}
			/>
			{props['parallax-status'] && (
				<Fragment>
					<FancyRadioControl
						label={__('Direction', 'maxi-blocks')}
						selected={props['parallax-direction']}
						options={[
							{ label: __('Up', 'maxi-blocks'), value: 'up' },
							{
								label: __('Down', 'maxi-blocks'),
								value: 'down',
							},
						]}
						onChange={val =>
							onChange({ 'parallax-direction': val })
						}
					/>
					<RangeSliderControl
						label={__('Speed', 'maxi-blocks')}
						value={props['parallax-speed']}
						defaultValue={getDefaultAttribute('parallax-speed')}
						onChange={val => onChange({ 'parallax-speed': +val })}
						min={1}
						max={10}
						allowReset
						initialPosition={getDefaultAttribute('parallax-speed')}
					/>
				</Fragment>
			)}
		</div>
	);
};

export default ParallaxControl;
