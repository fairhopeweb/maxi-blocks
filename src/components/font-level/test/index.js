/**
 * Wordpress dependencies
 */
const {	SelectControl } = wp.components;
const { Component } = wp.element;
const {
    dispatch,
    select
} = wp.data;

/**
 * Internal dependencies
 */
import DefaultTypography from '../../../extensions/defaults/typography';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil } from 'lodash';

/**
 * Block
 */
export default class FontLevelTest extends Component {
    state = {
        target: this.props.target ? this.props.target : ''
    }

    /**
    * Retrieves the old meta data
    */
    get getMeta() {
        let meta = select('core/editor').getEditedPostAttribute('meta')._gutenberg_extra_responsive_styles;
        return meta ? JSON.parse(meta) : {};
    }

    /**
     * Retrieve the target for responsive CSS
     */
    get getTarget() {
        let styleTarget = select('core/block-editor').getBlockAttributes(select('core/block-editor').getSelectedBlockClientId()).uniqueID;
        styleTarget = `${styleTarget}${this.state.target.length > 0 ? `__$${this.state.target}` : ''}`;
        return styleTarget;
    }

    /**
    * Creates a new object that 
    *
    * @param {string} target	Block attribute: uniqueID
    * @param {obj} meta		Old and saved metadate
    * @param {obj} value	New values to add
    */
    metaValue(fontOptResponse) {
        const meta = this.getMeta;
        const styleTarget = this.getTarget;
        const responsiveStyle = new ResponsiveStylesResolver(styleTarget, meta, fontOptResponse);
        const response = JSON.stringify(responsiveStyle.getNewValue);
        return response;
    }

    /**
    * Saves and send the data. Also refresh the styles on Editor
    */
    saveAndSend(value, fontOptResponse) {
        this.props.onChange(value, JSON.stringify(fontOptResponse));
        dispatch('core/editor').editPost({
            meta: {
                _gutenberg_extra_responsive_styles: this.metaValue(fontOptResponse),
            },
        });
        new BackEndResponsiveStyles(this.getMeta);
    }

    render() {
        {
            const {
                label,
                className = 'gx-title-level',
                value,
                fontOptions,
                disableP = false,
                disableH1 = false,
                disableH2 = false,
                disableH3 = false,
                disableH4 = false,
                disableH5 = false,
                disableH6 = false,
            } = this.props;
        
            let classes = classnames('gx-title-level');
            if(className)
                classes = classnames(classes, className);
        
            const getOptions = () => {
                let response = [];
                if(!disableP)
                    response.push({ label: 'Paragraph', value: 'p'})
                if(!disableH1)
                    response.push({ label: 'H1', value: 'h1' })
                if(!disableH2)
                    response.push({ label: 'H2', value: 'h2' })
                if(!disableH3)
                    response.push({ label: 'H3', value: 'h3' })
                if(!disableH4)
                    response.push({ label: 'H4', value: 'h4' })
                if(!disableH5)
                    response.push({ label: 'H5', value: 'h5' })
                if(!disableH6)
                    response.push({ label: 'H6', value: 'h6' })
                return response;
            }
            const onChangeValue = value => {
                let fontOptResponse = {};
                if(!isNil(fontOptions)) {
                    const devices = ['desktop', 'tablet', 'mobile'];
                    fontOptResponse = typeof fontOptions === 'object' ? fontOptions : JSON.parse(fontOptions);
                    fontOptResponse.general.color = DefaultTypography[value].color;
                    devices.forEach(device => {
                        fontOptResponse[device]['font-sizeUnit'] = DefaultTypography[value].sizeUnit;
                        fontOptResponse[device]['font-size'] = DefaultTypography[value].size;
                        fontOptResponse[device]['line-heightUnit'] = DefaultTypography[value].lineHeightUnit;
                        fontOptResponse[device]['line-height'] = DefaultTypography[value].lineHeight;
                        fontOptResponse[device]['letter-spacingUnit'] = DefaultTypography[value].letterSpacingUnit;
                        fontOptResponse[device]['letter-spacing'] = DefaultTypography[value].letterSpacing;
                        fontOptResponse[device]['font-weight'] = DefaultTypography[value].fontWeight;
                        fontOptResponse[device]['text-transform'] = DefaultTypography[value].textTransform;
                        fontOptResponse[device]['font-style'] = DefaultTypography[value].fontStyle;
                        fontOptResponse[device]['text-decoration'] = DefaultTypography[value].textDecoration;
                    })
                }
                this.saveAndSend(value, fontOptResponse)
            }
        
            return (
                <SelectControl
                    label={label}
                    className={classes}
                    value={value}
                    options={getOptions()}
                    onChange={onChangeValue}
                />
            )
        }
    }
}
