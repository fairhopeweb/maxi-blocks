import './editor.scss';
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
    ColorPicker,
    __experimentalGradientPicker
} = wp.components;

/**
 * Internal dependencies
 */
import { CheckBoxControl } from '../index';
import PopoverControl from '../popover-control';

/**
 * External dependencies
 */
import { isNil } from 'lodash';
import classnames from 'classnames';

/**
 * Styles and icons
 */
import './editor.scss';
import {
    colorWheel,
    gradient as iconGradient
} from '../../icons';

/**
 * Component
 */
const ColorControl = props => {
    const {
        label,
        className,
        disableColor = false,
        color,
        defaultColor = '',
        onColorChange,
        colorIcon = colorWheel,
        disableGradient = false,
        gradient,
        defaultGradient = '',
        onGradientChange,
        gradientIcon = iconGradient,
        disableGradientAboveBackground = false,
        gradientAboveBackground,
        onGradientAboveBackgroundChange,
    } = props;

    const classes = classnames('components-base-control gx-colorcontrol-control', className);

    const returnColor = val => {
        return `rgba(${val.rgb.r},${val.rgb.g},${val.rgb.b},${val.rgb.a})`;
    }

    const getPopovers = () => {
        let response = [];
        if (!disableColor) {
            response.push(
                {
                    content: (
                        <ColorPicker
                            color={color}
                            onChangeComplete={val => onColorChange(returnColor(val))}
                        />
                    ),
                    classNamePopover: "gx-colorcontrol-color-popover gx-popover",
                    icon: colorIcon
                },
            )
        }
        if (!disableGradient) {
            response.push(
                {
                    content: (
                        <Fragment>
                            <__experimentalGradientPicker
                                value={gradient}
                                onChange={val => onGradientChange(val)}
                            />
                            {disableGradientAboveBackground &&
                                <CheckBoxControl
                                    label={__('Above Background Image', 'gutenberg-extra')}
                                    checked={gradientAboveBackground}
                                    onChange={val => onGradientAboveBackgroundChange(val)}
                                />
                            }
                        </Fragment>
                    ),
                    classNamePopover: "gx-colorcontrol-gradient-popover gx-popover",
                    icon: gradientIcon
                }
            )
        }

        return response;
    }

    const onReset = () => {
            if (!disableColor)
                onColorChange(defaultColor);
            if (!disableGradient)
                onGradientChange(defaultGradient);
            if (!disableGradient && !disableGradientAboveBackground)
                onGradientAboveBackgroundChange(false);
    }

    return (
        <div className={classes}>
            <div className="gx-colorcontrol-color-display">
                <span
                    style={{
                        background: gradient ? gradient : color,
                    }}
                ></span>
            </div>
            <PopoverControl
                label={label}
                showReset
                onReset={onReset}
                popovers={getPopovers()}
            />
        </div>
    )
}

export default ColorControl;