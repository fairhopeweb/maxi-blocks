/**
 * Internal dependencies
 */
import * as blocksData from '../../../blocks/data';

/**
 * Returns block name from uniqueID
 */
export const getBlockNameFromUniqueID = uniqueID =>
	uniqueID.slice(0, uniqueID.lastIndexOf('-'));

/**
 * Returns block data from uniqueID
 */
export const getBlockDataByUniqueID = uniqueID =>
	Object.values(blocksData).find(
		data => data?.name === getBlockNameFromUniqueID(uniqueID)
	);

/**
 * Returns blocks customCss selectors
 */
export const getBlockSelectorsByUniqueID = uniqueID =>
	getBlockDataByUniqueID(uniqueID)?.customCss.selectors;

/**
 * Returns blocks interactionBuilderSettings
 */
export const getTransitionSetting = ({ uniqueID, settings }) =>
	getBlockDataByUniqueID(uniqueID)?.interactionBuilderSettings?.find(
		currentSettings => currentSettings?.label === settings
	);
