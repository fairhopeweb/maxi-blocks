/**
 * Internal dependencies
 */
import * as blocksData from '../../../blocks/data';

/**
 * Returns all migrators saveMigrator combinations
 */
export const getMigratorsCombinations = migrators => {
	const result = [];

	const combinator = (props, migrators) => {
		for (let i = 0; i < migrators.length; i += 1) {
			result.push([...props, migrators[i]]);

			combinator([...props, migrators[i]], migrators.slice(i + 1));
		}
	};

	combinator([], migrators);

	return result;
};

/**
 * Generates an array of migrators
 */
export const migratorGenerator = ({ mainMigrator, saveMigrators, save }) => [
	...mainMigrator,
	...saveMigrators.map(migrator => {
		return {
			...mainMigrator,
			save: props => {
				let currentInstance = save(props);

				migrator.forEach(saveMigrator => {
					currentInstance = saveMigrator(currentInstance, props);
				});

				return currentInstance;
			},
		};
	}),
];

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
