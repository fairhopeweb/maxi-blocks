/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { findTargetParent, getChildColumns, goThroughColumns } from './utils';

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

const removeBlockFromColumns = (
	blockPosition,
	parentColumnClientId,
	parentInnerBlocksCount,
	updateInnerBlocksPositions
) => {
	const { getBlock } = select('core/block-editor');

	const parentColumn = getBlock(parentColumnClientId);

	if (!parentColumn?.innerBlocks) {
		return;
	}

	const childColumns = getChildColumns(parentColumnClientId);

	const blockIndex = blockPosition[blockPosition.length - 1];

	const clientIdsToRemove = [];
	let wasBlockRemoved = false;

	goThroughColumns(childColumns, parentColumnClientId, column => {
		const targetParent = findTargetParent(blockPosition, column);

		if (!targetParent) {
			return;
		}

		const blockToRemoveClientId =
			targetParent.innerBlocks[blockIndex]?.clientId;

		if (blockToRemoveClientId && targetParent.innerBlocks[blockIndex]) {
			if (targetParent.innerBlocks.length !== parentInnerBlocksCount) {
				wasBlockRemoved = true;
			}

			clientIdsToRemove.push(blockToRemoveClientId);
		}
	});

	if (!wasBlockRemoved && !isEmpty(clientIdsToRemove)) {
		const {
			replaceInnerBlocks,
			__unstableMarkNextChangeAsNotPersistent:
				markNextChangeAsNotPersistent,
		} = dispatch('core/block-editor');
		const { getBlockRootClientId } = select('core/block-editor');

		// Use replaceInnerBlocks instead of removeBlocks,
		// because markNextChangeAsNotPersistent is not working with removeBlocks
		clientIdsToRemove.forEach(clientId => {
			const rootClientId = getBlockRootClientId(clientId);
			const rootBlock = getBlock(rootClientId);

			markNextChangeAsNotPersistent();
			replaceInnerBlocks(
				rootClientId,
				rootBlock.innerBlocks.filter(
					innerBlock => innerBlock.clientId !== clientId
				)
			);

			updateInnerBlocksPositions?.();
		});
	}
};

export default removeBlockFromColumns;
