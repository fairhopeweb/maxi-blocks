/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
import __experimentalNumberControl from '../number-control';

/**
 * Extenral dependencies
 */
import classnames from 'classnames';
import { isObject } from 'lodash';

/**
 * Component
 */
const ResponsiveControl = props => {
    const {
        breakpoints,
        onChange,
        className,
        breakpoint
    } = props;

    const value = !isObject(breakpoints) ? 
        JSON.parse(breakpoints) :
        breakpoints;

    // console.log(value)

    const classes = classnames(
        'maxi-responsive-control',
        className
    )

    return (
        <div
            className={classes}
        >
            <__experimentalNumberControl 
                label={__('Breakpoint', 'maxi-blocks')}
                className='maxi-responsive-control__breakpoint'
                value={value[breakpoint]}
                onChange={val => {
                    value[breakpoint] = val;
                    onChange(JSON.stringify(value))
                }}
                min={0}
                max={9999}
            />
        </div>
    )
}

export default ResponsiveControl;