/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
    RangeControl,
    Button
} = wp.components;
const { dispatch } = wp.data;

/**
 * Internal dependencies
 */
import { GXComponent } from '../index';
import AccordionControl from '../accordion-control';
import AlignmentControl from '../alignment-control';
import BorderControl from '../border-control';
import BoxShadowControl from '../box-shadow-control';
import ColorControl from '../color-control';
import DimensionsControl from '../dimensions-control';
import FullSizeControl from '../full-size-control';
import LinkedButton from '../linked-button';
import NormalHoverControl from '../normal-hover-control';
import TypographyControl from '../typography-control';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {
    isEmpty,
    isNil,
} from 'lodash';

/**
 * Styles and icons
 */
import './editor.scss';
import { library } from '../../icons';

/**
 * Block
 */
export class ButtonSettings extends GXComponent {

    target = this.props.target ? this.props.target : 'gx-buttoneditor-button';

    state = {
        selectorTypographyColors: 'normal',
        selector2OpacityShadow: 'normal',
        selectorPaddingMargin: 'normal',
        selectorBorder: 'normal'
    }

    componentDidMount() {
        const value = typeof this.props.buttonSettings === 'object' ? this.props.buttonSettings : JSON.parse(this.props.buttonSettings);
        this.saveAndSend(value)
    }

    /**
     * Creates a new object for being joined with the rest of the values on meta
     */
    get getObject() {
        if (this.type === 'normal')
            return this.getNormalStylesObject;
        if (this.type === 'hover')
            return this.getHoverStylesObject;
    }

    get getNormalStylesObject() {
        const response = {
            label: this.object.label,
            general: {}
        }
        if (!isNil(this.object.alignment)) {
            switch (this.object.alignment) {
                case 'left':
                    response.general['margin-right'] = 'auto';
                    break;
                case 'center':
                case 'justify':
                    response.general['margin-right'] = 'auto';
                    response.general['margin-left'] = 'auto';
                    break;
                case 'right':
                    response.general['margin-left'] = 'auto';
                    break;
            }
        }
        if (!isEmpty(this.object.normal.color)) {
            response.general['color'] = this.object.normal.color;
        }
        if (!isEmpty(this.object.normal.backgroundColor)) {
            response.general['background-color'] = this.object.normal.backgroundColor;
        }
        if (!isEmpty(this.object.normal.borderSettings.borderColor)) {
            response.general['border-color'] = this.object.normal.borderSettings.borderColor;
        }
        if (!isEmpty(this.object.normal.borderSettings.borderType)) {
            response.general['border-style'] = this.object.normal.borderSettings.borderType;
        }
        return response;
    }

    get getHoverStylesObject() {
        const response = {
            label: this.object.label,
            general: {}
        }
        if (!isEmpty(this.object.hover.color)) {
            response.general['color'] = this.object.hover.color;
        }
        if (!isEmpty(this.object.hover.backgroundColor)) {
            response.general['background-color'] = this.object.hover.backgroundColor;
        }
        if (!isEmpty(this.object.hover.borderSettings.borderColor)) {
            response.general['border-color'] = this.object.hover.borderSettings.borderColor;
        }
        if (!isEmpty(this.object.hover.borderSettings.borderType)) {
            response.general['border-style'] = this.object.hover.borderSettings.borderType;
        }
        return response;
    }

    /**
    * Saves and send the data. Also refresh the styles on Editor
    */
    saveAndSend(value) {
        this.save(value);

        this.target = this.props.target ? this.props.target : 'gx-buttoneditor-button';
        this.saveMeta(value, 'normal');

        this.target = `${this.target}:hover`;
        this.saveMeta(value, 'hover');

        new BackEndResponsiveStyles(this.getMeta);
    }

    save(value) {
        this.props.onChange(JSON.stringify(value));
    }

    saveMeta(value, type) {
        dispatch('core/editor').editPost({
            meta: {
                _gutenberg_extra_responsive_styles: this.metaValue(value, type),
            },
        });
    }

    render() {
        const {
            className = 'gx-buttonstyles-control',
            buttonSettings,
            target = 'gx-buttoneditor-button'
        } = this.props;

        const {
            selectorTypographyColors,
            selector2OpacityShadow,
            selectorPaddingMargin,
            selectorBorder
        } = this.state;

        const value = typeof buttonSettings === 'object' ? buttonSettings : JSON.parse(buttonSettings);

        return (
            <div className={className}>
                <AccordionControl
                    items={[
                        {
                            label: __('Typography & Colors', 'gutenberg-extra'),
                            className: "gx-typography-tab gx-typography-item",
                            icon: library,
                            content: (
                                <Fragment>
                                    <NormalHoverControl
                                        /*not sure about vvv class => may should go on the component itself*/
                                        className="gx-buttonstyles-selector-control"
                                        selected={selectorTypographyColors}
                                        onChange={selectorTypographyColors => {
                                            this.setState({ selectorTypographyColors });
                                        }}
                                    />
                                    <ColorControl
                                        label={__('Background Colour', 'gutenberg-extra')}
                                        color={value[selectorTypographyColors].backgroundColor}
                                        onColorChange={val => {
                                            value[selectorTypographyColors].backgroundColor = val;
                                            this.saveAndSend(value);
                                        }}
                                        gradient={value[selectorTypographyColors].background}
                                        onGradientChange={val => {
                                            value[selectorTypographyColors].background = val;
                                            saveAndSend();
                                        }}
                                        disableGradientOverBackground
                                    />
                                    <TypographyControl
                                        fontOptions={value[selectorTypographyColors].typography}
                                        onChange={val => {
                                            value[selectorTypographyColors].typography = val;
                                            this.saveAndSend(value);
                                        }}
                                        target={target}
                                    />
                                    {/** Should alignment be under Normal/hover scope? */}
                                    <AlignmentControl
                                        value={value.alignment}
                                        onChange={val => {
                                            value.alignment = val;
                                            this.saveAndSend(value)
                                        }}
                                        disableJustify
                                    />
                                </Fragment>
                            )
                        },
                        {
                            label: __('Opacity / Shadow', 'gutenberg-extra'),
                            /** why gx-typography-tab if is Opacity/shadow settings? */
                            className: "gx-typography-tab gx-box-settings-item",
                            content: (
                                <Fragment>
                                    <NormalHoverControl
                                        /*not sure about vvv class => may should go on the component itself*/
                                        className="gx-buttonstyles-selector-control"
                                        selected={selector2OpacityShadow}
                                        onChange={selector2OpacityShadow => {
                                            this.setState({ selector2OpacityShadow });
                                        }}
                                    />
                                    <RangeControl
                                        label={__("Opacity", "gutenberg-extra")}
                                        className={"gx-opacity-control"}
                                        value={value[selector2OpacityShadow].opacity * 100}
                                        onChange={val => {
                                            value[selector2OpacityShadow].opacity = val / 100;
                                            saveAndSend();
                                        }}
                                        min={0}
                                        max={100}
                                        allowReset={true}
                                        initialPosition={0}
                                    />
                                    <BoxShadowControl
                                        boxShadowOptions={value[selector2OpacityShadow].boxShadow}
                                        onChange={val => {
                                            value[selector2OpacityShadow].boxShadow = JSON.parse(val);
                                            this.saveAndSend(value)
                                        }}
                                        target={
                                            selector2OpacityShadow != 'hover' ?
                                                `${target}` :
                                                `${target}:hover`
                                        }
                                    />
                                    <BoxShadowControl
                                        boxShadowOptions={value[selectorBorder].boxShadow}
                                        onChange={val => {
                                            value[selectorBorder].boxShadow = JSON.parse(val);
                                            this.saveAndSend(value)
                                        }}
                                        target={
                                            selectorBorder != 'hover' ?
                                                `${target}` :
                                                `${target}:hover`
                                        }
                                    />
                                </Fragment>
                            )
                        },
                        {
                            label: __("Border", "gutenberg-extra"),
                            className: 'gx-border-tab gx-border-item',
                            content: (
                                <Fragment>
                                    <NormalHoverControl
                                        /*not sure about vvv class => may should go on the component itself*/
                                        className="gx-buttonstyles-selector-control"
                                        selected={selectorBorder}
                                        onChange={selectorBorder => {
                                            this.setState({ selectorBorder });
                                        }}
                                    />
                                    <BorderControl
                                        borderOptions={value[selector2OpacityShadow].borderSettings}
                                        onChange={val => {
                                            value[selector2OpacityShadow].borderSettings = val;
                                            this.saveAndSend(value)
                                        }}
                                        borderRadiusTarget={target}
                                        borderWidthTarget={target}
                                    />
                                </Fragment>
                            )
                        },
                        {
                            label: __('Width / Height', 'gutenberg-extra'),
                            /** why gx-typography-tab if its width/height? */
                            className: "gx-typography-tab gx-width-height-item",
                            content: (
                                <Fragment>
                                    <FullSizeControl
                                        sizeSettings={value.size}
                                        onChange={val => {
                                            value.size = val;
                                            this.saveAndSend(value);
                                        }}
                                        target={target}
                                    />
                                </Fragment>
                            )
                        },
                        {
                            label: __('Padding / Margin', 'gutenberg-extra'),
                            /** why gx-typography-tab if its width/height? */
                            className: "gx-typography-tab gx-padding-margin-item",
                            content: (
                                <Fragment>
                                    <NormalHoverControl
                                        /*not sure about vvv class => may should go on the component itself*/
                                        className="gx-buttonstyles-selector-control"
                                        selected={selectorPaddingMargin}
                                        onChange={selectorPaddingMargin => {
                                            this.setState({ selectorPaddingMargin });
                                        }}
                                    />
                                    <DimensionsControl
                                        value={value[selectorPaddingMargin].padding}
                                        onChange={val => {
                                            value[selectorPaddingMargin].padding = val;
                                            this.saveAndSend(value)
                                        }}
                                        target={target}
                                    />
                                    <DimensionsControl
                                        value={value[selectorPaddingMargin].margin}
                                        onChange={val => {
                                            value[selectorPaddingMargin].margin = val;
                                            this.saveAndSend(value)
                                        }}
                                        target={target}
                                    />
                                </Fragment>
                            )
                        }
                    ]}
                />
            </div>
        )
    }
}

/**
 * Backend editor
 */
export const ButtonEditor = props => {
    const {
        className,
        buttonSettings,
        onChange,
        placeholder = __('Read more text...', 'gutenberg-extra')
    } = props;

    const value = typeof buttonSettings === 'object' ? buttonSettings : JSON.parse(buttonSettings);
    const classes = classnames("gx-buttoneditor-button", className);

    return (
        <LinkedButton
            className={classes}
            placeholder={placeholder}
            buttonText={value.buttonText}
            onTextChange={val => {
                value.buttonText = val;
                onChange(JSON.stringify(value));
            }}
            externalLink={value.linkOptions}
            onLinkChange={val => {
                value.linkOptions = val;
                onChange(JSON.stringify(value));
            }}
        />
    )
}

/**
 * FrontEnd
 */
export const ButtonSaver = props => {
    const {
        className,
        buttonSettings,
    } = props;

    const value = typeof buttonSettings === 'object' ? buttonSettings : JSON.parse(buttonSettings);
    const linkProps = {
        href: value.linkOptions.url || '',
        target: value.linkOptions.opensInNewTab ? '_blank' : '_self'
    }
    const classes = classnames("gx-buttoneditor-button", className)

    return (
        <Fragment>
            {value.buttonText &&
                <Button
                    className={classes}
                    href={value.linkOptions.url}
                    {...linkProps}
                >
                    {value.opensInNewTab}
                    {value.buttonText}
                </Button>
            }
        </Fragment>
    )
}