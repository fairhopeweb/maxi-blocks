/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import getGroupAttributes from '../../extensions/styles/getGroupAttributes';
import BackgroundDisplayer from '../../components/background-displayer/newBackgroundDisplayer';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil } from 'lodash';

/**
 * Save
 */
const save = props => {
	const { attributes, className } = props;
	const {
		uniqueID,
		blockStyle,
		defaultBlockStyle,
		extraClassName,
	} = attributes;

	const classes = classnames(
		`maxi-motion-effect maxi-motion-effect-${uniqueID}`,
		'maxi-block maxi-group-block',
		blockStyle,
		extraClassName,
		className,
		!isNil(uniqueID) ? uniqueID : null
	);

	return (
		<Fragment>
			<section
				className={classes}
				data-gx_initial_block_class={defaultBlockStyle}
				data-motion-id={uniqueID}
			>
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
				<div className='maxi-group-block__group'>
					<InnerBlocks.Content />
				</div>
			</section>
		</Fragment>
	);
};

export default save;
