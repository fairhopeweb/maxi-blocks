/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { SelectControl } = wp.components;
const { useSelect } = wp.data;

/**
 * Internal dependencies
 */
import ColorControl from '../color-control';
import DimensionsControl from '../dimensions-control/index';
import DefaultStylesControl from '../default-styles-control';
import { getDefaultProp } from '../../extensions/styles/utils';
import {
    borderSolid,
    borderDasehd,
    borderDotted
} from './defaults'

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Component
 */
const BorderControl = props => {
    const {
        borderOptions,
        className,
        target = '',
        onChange
    } = props;

    const { clientId } = useSelect(
        select => {
            const { getSelectedBlockClientId } = select(
                'core/block-editor'
            );
            return {
                clientId: getSelectedBlockClientId()
            }
        },
        []
    )

    let value = typeof borderOptions === 'object' ?
        borderOptions :
        JSON.parse(borderOptions);
    const classes = classnames(
        'maxi-border-control',
        className
    );
    
    return (
        <div className={classes}>
            <DefaultStylesControl
                onChangeDefault={() => onChange(getDefaultProp(clientId, 'border'))}
                items={[
                    {
                        content: (
                            <hr
                                style={{
                                    borderTop: '2px solid #000',
                                    width: '2rem'
                                }}
                            />
                        ),
                        onChange: () => onChange(JSON.stringify(borderSolid))

                    },
                    {
                        content: (
                            <hr
                                style={{
                                    borderTop: '2px dashed #000',
                                    width: '2rem'
                                }}
                            />
                        ),
                        onChange: () => onChange(JSON.stringify(borderDasehd))
                    },
                    {
                        content: (
                            <hr
                                style={{
                                    borderTop: '2px dotted #000',
                                    width: '2rem'
                                }}
                            />
                        ),
                        onChange: () => onChange(JSON.stringify(borderDotted))
                    },
                ]}
            />
            <ColorControl
                label={__('Color', 'maxi-blocks')}
                color={value.general['border-color']}
                defaultColor={value['defaultBorderColor']}
                onColorChange={val => {
                    value.general['border-color'] = val;
                    onChange(JSON.stringify(value));
                }}
                disableGradient
                disableGradientAboveBackground
            />
            <SelectControl
                label={__('Border Type', 'maxi-blocks')}
                className='maxi-border-control__type'
                value={value.general['border-style']}
                options={[
                    { label: 'None', value: 'none' },
                    { label: 'Dotted', value: 'dotted' },
                    { label: 'Dashed', value: 'dashed' },
                    { label: 'Solid', value: 'solid' },
                    { label: 'Double', value: 'double' },
                    { label: 'Groove', value: 'groove' },
                    { label: 'Ridge', value: 'ridge' },
                    { label: 'Inset', value: 'inset' },
                    { label: 'Outset', value: 'outset' },
                ]}
                onChange={val => {
                    value.general['border-style'] = val;
                    onChange(JSON.stringify(value));
                }}
            />
            <DimensionsControl
                value={value.borderWidth}
                onChange={val => {
                    value.borderWidth = JSON.parse(val);
                    onChange(JSON.stringify(value));
                }}
                target={target}
            />
            <DimensionsControl
                value={value.borderRadius}
                onChange={val => {
                    value.borderRadius = JSON.parse(val);
                    onChange(JSON.stringify(value));
                }}
                target={target}
            />
        </div>
    )
}

export default BorderControl;