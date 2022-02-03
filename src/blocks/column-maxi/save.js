/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import MaxiBlock from '../../components/maxi-block';
import { getMaxiBlockAttributes } from '../../extensions/maxi-block';

/**
 * Save
 */
const save = props => {
	const name = 'maxi-blocks/column-maxi';

	return (
		<MaxiBlock {...getMaxiBlockAttributes({ ...props, name })} isSave>
			<InnerBlocks.Content />
		</MaxiBlock>
	);
};

export default save;
