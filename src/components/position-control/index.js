/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { SelectControl } = wp.components;

/**
 * Internal dependencies
 */
import __experimentalAxisControl from '../axis-control';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {
    isObject,
    isEmpty
} from 'lodash';

/**
 * Component
 */
const PositionControl = props => {
    const {
        position,
        className,
        onChange,
        breakpoint
    } = props;

    let value = !isObject(position) ?
        JSON.parse(position) :
        position;

    const classes = classnames(
        'maxi-position-control',
        className
    );

    const cleanOptions = {
        "top": "",
        "right": "",
        "bottom": "",
        "left": "",
        "sync": false,
        "unit": ""
    };

    return (
        <div
            className={classes}
        >
            <SelectControl
                label={__('Position', 'maxi-blocks')}
                options={[
                    { label: 'Default', value: '' },
                    { label: 'Relative', value: 'relative' },
                    { label: 'Absolute', value: 'absolute' },
                    { label: 'Fixed', value: 'fixed' },
                ]}
                value={value[breakpoint].position}
                onChange={val => {
                    value[breakpoint].position = val;
                    if (isEmpty(val))
                        value.options[breakpoint] = cleanOptions;
                    onChange(JSON.stringify(value))
                }}
            />
            {
                !isEmpty(value[breakpoint].position) &&
                <__experimentalAxisControl
                    values={value.options}
                    onChange={val => {
                        value.options = JSON.parse(val);
                        onChange(JSON.stringify(value))
                    }}
                    breakpoint={breakpoint}
                    disableAuto
                />
            }
        </div>
    )
}

export default PositionControl;