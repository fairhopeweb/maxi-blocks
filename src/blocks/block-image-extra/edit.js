/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const {
    Spinner,
    IconButton
} = wp.components;
const {
    __experimentalBlock,
    MediaUpload
} = wp.blockEditor;
const { 
    dispatch,
    withSelect,
} = wp.data;

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import { GXBlock } from '../../components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import {
    isEmpty,
    isNil,
    isNumber
} from 'lodash';

/**
 * Icons
 */
import { placeholderImage } from '../../icons';

/**
 * Content
 */
class edit extends GXBlock {

    componentDidMount() {
        this.uniqueIDChecker(this.props.attributes.uniqueID, this.displayStyles.bind(this)); // May should go on constructor
    }

    componentDidUpdate() {
        this.displayStyles();
    }

    /**
     * Retrieve the target for responsive CSS
     */
    get getTarget() {
        if (this.type === 'normal')
            return `${this.props.attributes.uniqueID}`;
        if (this.type === 'hover')
        return `${this.props.attributes.uniqueID}:hover`;
    }

    get getObject() {
        if (this.type === 'normal')
            return this.getNormalObject
        if (this.type === 'hover')
            return this.getHoverObject
    }

    get getNormalObject() {
        const {
            alignment,
            opacity,
            backgroundColor,
            backgroundGradient
        } = this.props.attributes;

        const response = {
            label: 'Image',
            general: {}
        }

        if (!isNil(alignment)) {
            switch (alignment) {
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
        if (isNumber(opacity))
            response.general['opacity'] = opacity;
        if (!isEmpty(backgroundColor))
            response.general['background-color'] = backgroundColor;
        if (!isEmpty(backgroundGradient))
            response.general['background'] = backgroundGradient;

        return response;
    }

    get getHoverObject() {
        const {
            opacityHover,
            backgroundColorHover,
            backgroundGradientHover
        } = this.props.attributes;

        const response = {
            label: 'Image',
            general: {}
        }
        if (opacityHover)
            response.general['opacity'] = opacityHover;
        if (!isEmpty(backgroundColorHover))
            response.general['background-color'] = backgroundColorHover;
        if (!isEmpty(backgroundGradientHover))
            response.general['background'] = backgroundGradientHover;
        return response;
    }

    /**
    * Refresh the styles on Editor
    */
    displayStyles() {
        this.saveMeta('normal');
        this.saveMeta('hover');

        new BackEndResponsiveStyles(this.getMeta);
    }

    saveMeta(type) {
        dispatch('core/editor').editPost({
            meta: {
                _gutenberg_extra_responsive_styles: this.metaValue(null, type, false),
            },
        });
    }


    render() {
        const {
            className,
            attributes: {
                uniqueID,
                blockStyle,
                defaultBlockStyle,
                extraClassName,
                captionType,
                captionContent,
                size,
                mediaID,
                mediaALT,
                mediaURL,
                mediaWidth,
                mediaHeight
            },
            imageData,
            setAttributes,
        } = this.props;

        let classes = classnames(
            'gx-block gx-image-block',
            blockStyle,
            extraClassName,
            uniqueID,
            className
        );

        const cropOptions = typeof this.props.attributes.cropOptions === 'object' ?
            this.props.attributes.cropOptions :
            JSON.parse(this.props.attributes.cropOptions);

        const getImage = () => {
            if (size === 'custom' && !isEmpty(cropOptions.image.source_url))
                return cropOptions.image;
            if (imageData && size)
                return imageData.media_details.sizes[size];
            if (imageData)
                return imageData.media_details.sizes.full;
        }

        const image = getImage();
        if (image && imageData) {
            console.log(image.source_url)

            if(mediaALT != imageData.alt_text)
                setAttributes({ mediaALT: imageData.alt_text})
            if(mediaURL != image.source_url)
                setAttributes({ mediaURL: image.source_url })
            if(mediaWidth != image.width)
                setAttributes({ mediaWidth: image.width })
            if(mediaHeight != image.height)
                setAttributes({ mediaHeight: image.height })
        }

        return [
            <Inspector {...this.props} />,
            <__experimentalBlock.figure
                className={classes}
                data-gx_initial_block_class={defaultBlockStyle}
            >
                <MediaUpload
                    onSelect={media => setAttributes({ mediaID: media.id })}
                    allowedTypes="image"
                    value={mediaID}
                    render={({ open }) => (
                        <Fragment>
                            {!isNil(mediaID) && imageData ?
                                <Fragment>
                                    <div
                                        className="gx-image-block-settings"
                                    >
                                        <IconButton
                                            className='gx-image-block-upload-button'
                                            showTooltip="true"
                                            onClick={open}
                                            icon={placeholderImage}
                                        />
                                    </div>
                                    <img
                                        className={"wp-image-" + mediaID}
                                        src={mediaURL}
                                        width={mediaWidth}
                                        height={mediaHeight}
                                        alt={mediaALT}
                                    />
                                    {captionType !== 'none' &&
                                        <figcaption>
                                            {captionContent}
                                        </figcaption>
                                    }
                                </Fragment> :
                                mediaID ?
                                    <Fragment>
                                        <Spinner />
                                        <p>
                                            {__('Loading...', 'gutenberg-extra')}
                                        </p>
                                    </Fragment> :
                                    <IconButton
                                        className='gx-imageupload-button'
                                        showTooltip="true"
                                        onClick={open}
                                        icon={placeholderImage}
                                    >
                                    </IconButton>
                            }
                        </Fragment>
                    )}
                />
            </__experimentalBlock.figure>
        ];
    }
}

export default withSelect((select, ownProps) => {
    const {
        attributes: {
            mediaID
        }
    } = ownProps;

    const imageData = select('core').getMedia(mediaID);
    return {
        imageData
    }
})(edit);