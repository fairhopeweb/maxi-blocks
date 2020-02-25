/**
 * BLOCK: single testimonial
 *
 * Base testimonial block
 */


//  Import CSS.
import './style.scss';
import './editor.scss';


import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/editor';
import { RangeControl } from '@wordpress/components';
import { TextControl } from '@wordpress/components';
import { Button, ButtonGroup } from '@wordpress/components';
import { FormFileUpload } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { SelectControl } from '@wordpress/components';

// import { withState } from '@wordpress/compose';
const { __ } = wp.i18n;

const {
    RichText,
    alignmentToolbar,
    BlockControls,
    BlockalignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    ColorPalette,
    MediaUpload,
} = wp.editor;
const {
    Toolbar,
    Tooltip,
    PanelBody,
    PanelRow,
    FormToggle,
} = wp.components;

registerBlockType( 'gutenberg-extra/block-single-testimonial', {
    title: __( 'GX Single Testimonial'),
    icon: 'admin-comments',
    category: 'gutenberg-extra-blocks',
    attributes: {
        alignment: {
            type: 'string',
        },
        backgroundColor: {
            type: 'string',
            default: '#fff'
        },
        backgroundImage: {
            type: 'string',
            default: null
        },
        backgroundImageSize: {
            type: 'string',
            default: 'cover'
        },
        backgroundImagePosition: {
            type: 'string',
            default: 'center'
        },
        backgroundImageRepeat: {
            type: 'string',
            default: 'no-repeat'
        },
        fullWidth: {
            type: 'boolean',
            default: false
        },
        paddingTop: {
            type: 'string',
            default: '10px',
        },
        paddingRight: {
            type: 'string',
            default: '20px',
        },
        paddingBottom: {
            type: 'string',
            default: '10px',
        },
        paddingLeft: {
            type: 'string',
            default: "20px",
        },
        fullWidthClass: {
            type: 'string',
            default: ''
        },
        width: {
            type: 'number',
            'default': 100
        },
        maxWidth: {
            type: 'number',
            'default': 100
        },
        title: {
			type: 'array',
            source: 'children',
            selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		testimonial: {
			type: 'array',
			source: 'children',
			selector: 'p.gx-single-testimonial-text',
		},
		name: {
			type: 'array',
			source: 'children',
			selector: 'p.gx-single-testimonial-name',
		},
		position: {
			type: 'array',
			source: 'children',
			selector: 'p.gx-single-testimonial-position',
		},
    },
    getEditWrapperProps: function () {
        return {
            "data-align": "full"
        };
    },
    edit: function( props ) {
        const {
            attributes: {
                content,
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft,
                alignment,
                fullWidth,
                fullWidthClass,
                alignmentClass,
                width,
                maxWidth,
                backgroundImage,
                backgroundImageSize,
                backgroundImagePosition,
                backgroundImageRepeat,
                title,
                mediaID,
                mediaURL,
                testimonial,
                name,
                position
            },
            className,
            backgroundColor,
            setAttributes
        } = props;
 
        const onChangeContent = ( newContent ) => {
            props.setAttributes( { content: newContent } );
        };

        const onChangeTitle = ( newTitle ) => {
			props.setAttributes( { title: newTitle } );
		};

		const onSelectImage = ( media ) => {
			props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		const onChangeTestimonial = ( newTestimonial ) => {
			props.setAttributes( { testimonial: newTestimonial } );
		};

        const onChangeName= ( newName ) => {
            props.setAttributes( { name: newName } );
        };

        const onChangePosition= ( newPosition ) => {
            props.setAttributes( { position: newPosition } );
        };
 
        const onChangealignment = ( newalignment ) => {
            props.setAttributes( { alignment: newalignment === undefined ? 'none' : newalignment } );
        };

        //const { attributes: { backgroundColor }, setAttributes } = props;

        // Setup styles
        const styles = {
            backgroundColor: backgroundColor,
            paddingTop: paddingTop ? paddingTop : undefined,
            paddingRight: paddingRight ? paddingRight : undefined,
            paddingBottom: paddingBottom ? paddingBottom : undefined,
            paddingLeft: paddingLeft ? paddingLeft : undefined,
            width: width ? width + '%' : undefined,
            maxWidth: maxWidth ? maxWidth + '%' : undefined,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: backgroundImageSize,
            backgroundPosition: backgroundImagePosition,
            backgroundRepeat: backgroundImageRepeat,
        };

        function onChangeBackgroundColor( newBackground ) {
            setAttributes( { backgroundColor: newBackground } );
        }

        function onChangeWidth( newWidth ) {
            setAttributes( { width: newWidth } );
        }

        function onChangeMaxWidth( newMaxWidth ) {
            setAttributes( { maxWidth: newMaxWidth } );
        }

        function onChangePaddingTop( newPaddingTop ) {
            setAttributes( { paddingTop: newPaddingTop } );
        }

        function onChangePaddingRight( newPaddingRight ) {
            setAttributes( { paddingRight: newPaddingRight } );
        }

        function onChangePaddingBottom( newPaddingBottom ) {
            setAttributes( { paddingBottom: newPaddingBottom } );
        }

        function onChangePaddingLeft( newPaddingLeft ) {
            setAttributes( { paddingLeft: newPaddingLeft } );
        }

        function onChangeBackgroundImageSize( newBackgroundImageSize ) {
            setAttributes( { backgroundImageSize: newBackgroundImageSize } );
        }

        function onChangeBackgroundImagePosition( newBackgroundImagePosition ) {
            setAttributes( { backgroundImagePosition: newBackgroundImagePosition } );
        }

        function onChangeBackgroundImageRepeat( newBackgroundImageRepeat ) {
            setAttributes( { backgroundImageRepeat: newBackgroundImageRepeat } );
        }

        function onChangeBackgroundImage(imageObject) {
            setAttributes({
                backgroundImage: imageObject.sizes.full.url,
            })
        }

        return [ <React.Fragment>
                  <BlockControls>
                        <alignmentToolbar
                            value={ alignment }
                            onChange={ onChangealignment }
                        />
                    </BlockControls>


                     <InspectorControls>
                        <PanelBody
                        title={ __( 'Make Fullwidth' ) }>
                        <PanelRow>
                            <label htmlFor="full-width-toggle">
                                { __( 'Make Fullwidth' ) }
                            </label>
                            <FormToggle
                                id="full-width-toggle"
                                label={ __( 'Fullwidth' ) }
                                checked={ fullWidth }
                                onChange= {function(){
                                    fullWidth ? props.setAttributes({ fullWidth: false }) : props.setAttributes({ fullWidth: true })
                                    fullWidth ? props.setAttributes({ fullWidthClass: "ge-not-fullwidth" }) : props.setAttributes({ fullWidthClass: 'ge-fullwidth' })
                                }
                            }
                            />
                        </PanelRow>
                    </PanelBody>

                    <PanelColorSettings
                        title={ __( 'Background Color' ) }
                        colorValue={backgroundColor }
                        initialOpen={ false }
                        colorSettings={ [ {
                            value: backgroundColor,
                            onChange: onChangeBackgroundColor,
                            label: __( 'Choose a background color' ),
                        } ] }
                    >
                    </PanelColorSettings>

                    <PanelBody
                        title={ __( 'Background Image' ) }>
                        <MediaUpload
                            onSelect={onChangeBackgroundImage}
                            allowedTypes={ 'image' }
                            value={backgroundImage}
                            render={({ open }) => (
                                <button class="editor-post-featured-image__toggle" onClick={open}>
                                    Set Background Image
                                </button>
                            )}
                        />
                    </PanelBody>
                     <PanelBody
                        title={ __( 'Background Size' ) }>
                        <SelectControl
                            label="Select size"
                            value={ backgroundImageSize }
                            options={ [
                                { label: 'Cover', value: 'cover' },
                                { label: 'Contain', value: 'contain' },
                                { label: 'Auto', value: 'auto' },
                            ] }
                            onChange={ onChangeBackgroundImageSize }
                        />
                    </PanelBody>
                    <PanelBody
                        title={ __( 'Background Position' ) }>
                        <SelectControl
                            label="Select position"
                            value={ backgroundImagePosition }
                            options={ [
                                { label: 'Center', value: 'center' },
                                { label: 'Left', value: 'left' },
                                { label: 'Right', value: 'right' },
                                { label: 'Top', value: 'top' },
                                { label: 'Bottom', value: 'bottom' },
                            ] }
                            onChange={ onChangeBackgroundImagePosition }
                        />
                    </PanelBody>
                    <PanelBody
                        title={ __( 'Background Repeat' ) }>
                        <SelectControl
                            label="Repeat"
                            value={ backgroundImageRepeat }
                            options={ [
                                { label: 'No Repeat', value: 'no-repeat' },
                                { label: 'Repeat', value: 'repeat' },
                            ] }
                            onChange={ onChangeBackgroundImageRepeat }
                        />
                    </PanelBody>
                     <PanelBody className="padding-setting"
                        title={ __( 'Padding' ) }>
                        <TextControl
                            label="Padding Top"
                            value={ paddingTop }
                            onChange={ onChangePaddingTop }
                        />
                        <TextControl
                            label="Padding Right"
                            value={ paddingRight }
                            onChange={ onChangePaddingRight }
                        />
                        <TextControl
                            label="Padding Left"
                            value={ paddingLeft }
                            onChange={ onChangePaddingLeft }
                        />
                        <TextControl
                            label="Padding Bottom"
                            value={ paddingBottom }
                            onChange={ onChangePaddingBottom }
                        />
                                        
                    </PanelBody>

                     <PanelBody
                        title={ __( 'Width' ) }>
                        <RangeControl
                            label="Width"
                            value={ width }
                            onChange={ onChangeWidth }
                            min={ 0 }
                            max={ 100 }
                        />
                    </PanelBody>

                     <PanelBody
                        title={ __( 'Max-width' ) }>
                        <RangeControl
                            label="Max-width"
                            value={ maxWidth }
                            onChange={ onChangeMaxWidth }
                            min={ 0 }
                            max={ 100 }
                        />
                    </PanelBody>

                    <PanelBody
                        title={ __( 'Alignment' ) }>
                    <ButtonGroup>
                        <Button isDefault onClick={function(){props.setAttributes({ alignmentClass: "ge-left-align" })}}>Left</Button>
                        <Button onClick={function(){props.setAttributes({ alignmentClass: "ge-center-align" })}}>Center</Button>
                        <Button onClick={function(){props.setAttributes({ alignmentClass: "ge-right-align" })}}>Right</Button>
                    </ButtonGroup>
                    </PanelBody>
                    </InspectorControls>

                <div className={ props.className + " " + fullWidthClass + alignmentClass} style={ styles }>
                <RichText
                    tagName="h2"
                    className="gx-single-testimonial-title"
                    placeholder={ __( 'Write title…', 'gutenberg-extra' ) }
                    value={ title }
                    onChange={ onChangeTitle }
                />
				<div className="gx-single-testimonial-image">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes="image"
						value={ mediaID }
						render={ ( { open } ) => (
							<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! mediaID ? __( 'Upload Image', 'gutenberg-extra' ) : <img src={ mediaURL } alt={ __( 'Upload Image', 'gutenberg-extra' ) } /> }
							</Button>
						) }
					/>
				</div>
                <RichText
                    tagName="p"
                    className="gx-single-testimonial-text"
                    placeholder={ __( 'Write text', 'gutenberg-extra' ) }
                    value={ testimonial }
                    onChange={ onChangeTestimonial }
                />
                <RichText
                    tagName="p"
                    className="gx-single-testimonial-name"
                    placeholder={ __( 'Write name', 'gutenberg-extra' ) }
                    value={ name }
                    onChange={ onChangeName }
                />
                <RichText
                    tagName="p"
                    className="gx-single-testimonial-position"
                    placeholder={ __( 'Write position', 'gutenberg-extra' ) }
                    value={ position }
                    onChange={ onChangePosition }
                />
                </div>
                  </React.Fragment>
        ];
    },
    save: function( props ) {
        // Setup the attributes
        const {
            backgroundColor,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            alignment,
            fullWidth,
            fullWidthClass,
            alignmentClass,
            width,
            maxWidth,
            backgroundImage,
            backgroundImageSize,
            backgroundImagePosition,
            backgroundImageRepeat,
            title,
            mediaID,
            mediaURL,
            testimonial,
            name,
            position
        } = props.attributes;

        // Setup styles
        const styles = {
            backgroundColor: backgroundColor,
            paddingTop: paddingTop ? paddingTop : undefined,
            paddingRight: paddingRight ? paddingRight : undefined,
            paddingBottom: paddingBottom ? paddingBottom  : undefined,
            paddingLeft: paddingLeft ? paddingLeft : undefined,
            width: width ? width + '%' : undefined,
            maxWidth: maxWidth ? maxWidth + '%' : undefined,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: backgroundImageSize,
            backgroundPosition: backgroundImagePosition,
            backgroundRepeat: backgroundImageRepeat,
        };

        return (
            <div  className={ props.className + " " + fullWidthClass + alignmentClass} style={ styles }>
                <RichText.Content 
                tagName="h2" 
                className="gx-single-testimonial-title"
                value={ title } 
                />

				{
					mediaURL && (
						<img className="gx-single-testimonial-image" src={ mediaURL } alt={ __( 'Person Image', 'gutenberg-extra' ) } />
					)
				}

                <RichText.Content 
                tagName="p" 
                className="gx-single-testimonial-text"
                value={ testimonial }
                 />
                 <RichText.Content 
                tagName="p" 
                className="gx-single-testimonial-name"
                value={ name }
                 />
                 <RichText.Content 
                tagName="p" 
                className="gx-single-testimonial-position"
                value={ position }
                 />


            </div>
        );
    },
} );