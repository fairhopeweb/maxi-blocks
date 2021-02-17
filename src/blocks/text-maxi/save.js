/**
 * WordPress dependencies
 */
const { RichText } = wp.blockEditor;
const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import { BackgroundDisplayer } from '../../components';
import { getGroupAttributes } from '../../extensions/styles';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil } from 'lodash';

/**
 * Save
 */
const save = props => {
	const { className, attributes } = props;
	const {
		uniqueID,
		blockStyle,
		defaultBlockStyle,
		fullWidth,
		extraClassName,
		textLevel,
		isList,
		typeOfList,
		content,
	} = attributes;

	const classes = classnames(
		`maxi-motion-effect maxi-motion-effect-${uniqueID}`,
		'maxi-block maxi-text-block',
		'maxi-text-block-wrap',
		blockStyle,
		!!attributes['text-highlight'] && 'maxi-highlight--text',
		!!attributes['background-highlight'] && 'maxi-highlight--background',
		!!attributes['border-highlight'] && 'maxi-highlight--border',
		extraClassName,
		uniqueID,
		className,
		fullWidth === 'full' ? 'alignfull' : null,
		!isNil(uniqueID) ? uniqueID : null
	);

	return (
		<Fragment>
			<div className={classes} data-motion-id={uniqueID}>
				{!attributes['background-highlight'] && (
					<BackgroundDisplayer
						{...getGroupAttributes(attributes, [
							'background',
							'backgroundColor',
							'backgroundImage',
							'backgroundVideo',
							'backgroundGradient',
							'backgroundSVG',
							'backgroundHover',
							'backgroundColorHover',
							'backgroundImageHover',
							'backgroundVideoHover',
							'backgroundGradientHover',
							'backgroundSVGHover',
						])}
						blockClassName={uniqueID}
					/>
				)}
				<RichText.Content
					className='maxi-text-block__content'
					value={content}
					tagName={isList ? typeOfList : textLevel}
					data-gx_initial_block_class={defaultBlockStyle}
				/>
			</div>
		</Fragment>
	);
};

export default save;
