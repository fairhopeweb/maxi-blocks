/**
 * WordPress dependencies
 */
const { InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import {
	ShapeDivider,
	BackgroundDisplayer,
	ArrowDisplayer,
} from '../../components';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil, isObject } from 'lodash';

/**
 * Save
 */
const save = props => {
	const {
		attributes: {
			uniqueID,
			isFirstOnHierarchy,
			blockStyle,
			defaultBlockStyle,
			fullWidth,
			background,
			extraClassName,
			shapeDivider,
			motion,
			arrow,
		},
		className,
	} = props;

	const classes = classnames(
		`maxi-motion-effect maxi-motion-effect-${uniqueID}`,
		'maxi-block maxi-container-block',
		blockStyle,
		extraClassName,
		className,
		fullWidth === 'full' ? 'alignfull' : null,
		!isNil(uniqueID) ? uniqueID : null
	);

	const shapeDividerValue = !isObject(shapeDivider)
		? JSON.parse(shapeDivider)
		: shapeDivider;

	return (
		<Fragment>
			{isFirstOnHierarchy && (
				<section
					className={classes}
					data-gx_initial_block_class={defaultBlockStyle}
					data-motion={motion}
					data-shape-divider={shapeDivider}
					data-motion-id={uniqueID}
					data-background={background}
				>
					<ArrowDisplayer arrow={arrow} />
					{!!shapeDividerValue.top.status && (
						<ShapeDivider shapeDividerOptions={shapeDivider} />
					)}
					<div className='maxi-container-block__wrapper'>
						<BackgroundDisplayer background={background} />
						<div className='maxi-container-block__container'>
							<InnerBlocks.Content />
						</div>
					</div>
					{!!shapeDividerValue.bottom.status && (
						<ShapeDivider
							position='bottom'
							shapeDividerOptions={shapeDivider}
						/>
					)}
				</section>
			)}
			{!isFirstOnHierarchy && (
				<div
					className={classes}
					data-gx_initial_block_class={defaultBlockStyle}
				>
					{!!shapeDividerValue.top.status && (
						<ShapeDivider shapeDividerOptions={shapeDivider} />
					)}
					<div className='maxi-container-block__wrapper'>
						<BackgroundDisplayer background={background} />
						<InnerBlocks.Content />
					</div>
					{!!shapeDividerValue.bottom.status && (
						<ShapeDivider
							position='bottom'
							shapeDividerOptions={shapeDivider}
						/>
					)}
				</div>
			)}
		</Fragment>
	);
};

export default save;
