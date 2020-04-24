/**
 * Gutenberg Extra extension class
 * 
 * @version 0.1
 */

/**
 * WordPress dependencies
 */
const { Component } = wp.element;
const {
    dispatch,
    select
} = wp.data;

/**
 * Class
 */
export default class GXComponent extends Component {

    target = this.props.target ? this.props.target : '';

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
        styleTarget = `${styleTarget}${this.target.length > 0 ? `__$${this.target}` : ''}`;
        return styleTarget;
    }

    get getObject() {
        return this.object;
    }

    /**
    * Creates a new object that 
    *
    * @param {string} target	Block attribute: uniqueID
    * @param {obj} meta		Old and saved metadate
    * @param {obj} value	New values to add
    */
    metaValue(value, type = null, avoidZero = true) {
        this.object = value;
        this.type = type || '';

        const meta = this.getMeta;
        const styleTarget = this.getTarget;
        const obj = this.getObject;

        const responsiveStyle = new ResponsiveStylesResolver(styleTarget, meta, obj, avoidZero);
        const response = JSON.stringify(responsiveStyle.getNewValue);

        return response;
    }

    /**
    * Saves and send the data. Also refresh the styles on Editor
    */
    saveAndSend(value, avoidZero = true) {
        this.props.onChange(JSON.stringify(value));
        dispatch('core/editor').editPost({
            meta: {
                _gutenberg_extra_responsive_styles: this.metaValue(value, null, avoidZero),
            },
        });
        new BackEndResponsiveStyles(this.getMeta);
    }
}