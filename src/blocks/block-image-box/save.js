/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
    RichText,
} = wp.blockEditor;

/**
 * External dependencies
 */
import classnames from 'classnames';
import { Link } from '../../components/link-options/index';
import { Image } from '../../components/image-settings';
import { ButtonSaver } from '../../components/button-styles/';
import {
    setLinkStyles,
    setTitleStyles,
    setSubTitleStyles,
    setDescriptionStyles,
    setButtonStyles,
    setBlockStyles,
} from './data';

const save = (props) => {
    const {
        className,
        attributes: {
            title,
            mediaID,
            imageSettings,
            description,
            additionalText,
            readMoreText,
            readMoreLink,
            titleLevel,
            blockStyle,
            defaultBlockStyle,
            titleFontFamily,
            uniqueID,
            backgroundImage,
            backgroundGradient,
            linkOptions,
            linkTitle,
            buttonStyles,
        },
    } = props;

    const linkStyles = setLinkStyles(props);
    const titleStyles = setTitleStyles(props);
    const subTitleStyles = setSubTitleStyles(props);
    const descriptionStyles = setDescriptionStyles(props);
    //const buttonStyles = setButtonStyles(props);
    const blockStyles = setBlockStyles(props);

    let classes = classnames(className);
    if (uniqueID && (typeof uniqueID !== 'undefined')) {
        classes = classnames(classes, uniqueID)
    }

    return (
        <div
            className={'gx-block ' + blockStyle + ' gx-image-box ' + classes}
            data-gx_initial_block_class={defaultBlockStyle}
            style={blockStyles}>
            <Link
                value={linkTitle}
                linkOptions={linkOptions}
                className="gx-image-box-link"
                style={linkStyles}
            >
                { mediaID &&
                    <Image 
                        className="gx-image-box-image"
                        imageSettings={imageSettings}
                        mediaID={mediaID}
                    />
                }
                <div class='gx-image-box-text'>
                    <RichText.Content 
                        tagName={titleLevel} 
                        style={titleStyles} 
                        className="gx-image-box-title" 
                        value={title} 
                    />
                    <RichText.Content 
                        tagName="p" 
                        style={subTitleStyles} 
                        className="gx-image-box-subtitle" 
                        value={additionalText} 
                    />
                    <RichText.Content 
                        tagName="p" 
                        style={descriptionStyles} 
                        className="gx-image-box-description" 
                        value={description} 
                    />
                    <ButtonSaver 
                        buttonSettings={buttonStyles}
                    />
                </div>
            </Link>
        </div>
    );
}

export default save;