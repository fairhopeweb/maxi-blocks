/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ResultCard from '../result-card';
import Button from '../../../button';
import { LOAD_MORE_COUNT } from '../../constants';

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

/**
 * Styles
 */
import './editor.scss';

const ResultCards = ({
	results,
	content,
	modifyOption,
	formatValue,
	historyStartId,
	selectedResultId,
	setResults,
	setSelectedResultId,
	setSelectedResult,
	setModifyOption,
	setCustomValue,
	setHistoryStartId,
	onContentChange,
	onChangeTextFormat,
	updateSettings,
	switchToGenerateTab,
	switchToModifyTab,
	isModifyTab = false,
}) => {
	const [loadUntilIndex, setLoadUntilIndex] = useState(LOAD_MORE_COUNT);

	const className = 'maxi-prompt-control-results';

	if (isEmpty(results) && !selectedResultId) {
		return (
			<div className={className}>
				<h4 className={`${className}__no-results`}>
					{__(
						isModifyTab
							? 'Select text or result from history to modify'
							: 'History is empty',
						'maxi-blocks'
					)}
				</h4>
			</div>
		);
	}

	return (
		<div className={className}>
			{results.slice(0, loadUntilIndex).map((result, index) => {
				const refResultIndex =
					result.refId &&
					results.findIndex(
						refResult => refResult.id === result.refId
					);

				const handleResultInsertion = () => {
					const { start: selectionStart, end: selectionEnd } =
						formatValue;

					const contentBeforeSelection = content.slice(
						0,
						selectionStart
					);
					const contentAfterSelection = content.slice(selectionEnd);
					const newContent =
						contentBeforeSelection +
						result.content +
						contentAfterSelection;

					if (selectionStart !== selectionEnd) {
						onChangeTextFormat({
							...formatValue,
							end: selectionStart + result.content.length,
						});
					}

					onContentChange(newContent);
				};

				const handleResultSelection = (id = result.id) =>
					setSelectedResultId(id);

				const handleResultUseSettings = () => {
					if (result.refId) {
						switchToModifyTab();

						setModifyOption(result.modificationType);
						setCustomValue(result.customValue);

						if (refResultIndex >= loadUntilIndex) {
							setLoadUntilIndex(refResultIndex + 1);
						}

						setSelectedResultId(result.refId);

						return;
					}

					if (result.settings) {
						updateSettings(result.settings);
						switchToGenerateTab();
					}
				};

				const handleResultModification = () => {
					setSelectedResultId(result.id);
					switchToModifyTab();
				};

				const handleResultDeletion = () => {
					if (isModifyTab) {
						setSelectedResult(null);

						if (result.id === selectedResultId) {
							setSelectedResultId(null);
						}

						return;
					}

					if (historyStartId === result.id) {
						setHistoryStartId(historyStartId - 1);
					}

					setResults(prevResults => {
						const newResults = [...prevResults].filter(
							deletedResult => deletedResult.id !== result.id
						);

						if (isEmpty(newResults)) {
							switchToGenerateTab();
						}

						return newResults;
					});

					if (selectedResultId === result.id) {
						setSelectedResultId(null);
					}
				};

				return (
					<ResultCard
						key={result.id}
						index={index + 1}
						result={result}
						isFromPreviousSession={result.id <= historyStartId}
						isSelected={result.id === selectedResultId}
						modifyOption={modifyOption}
						isRefExist={refResultIndex && refResultIndex >= 0}
						disableButtons={isModifyTab}
						onInsert={handleResultInsertion}
						onSelect={handleResultSelection}
						onUseSettings={handleResultUseSettings}
						onModify={handleResultModification}
						onDelete={handleResultDeletion}
					/>
				);
			})}
			{results.length > loadUntilIndex && (
				<div className={`${className}__load-more`}>
					<Button
						className='maxi-prompt-control-modify-tab__button'
						onClick={() =>
							setLoadUntilIndex(loadUntilIndex + LOAD_MORE_COUNT)
						}
					>
						{__('Load more', 'maxi-blocks')}
					</Button>
				</div>
			)}
		</div>
	);
};

export default ResultCards;
