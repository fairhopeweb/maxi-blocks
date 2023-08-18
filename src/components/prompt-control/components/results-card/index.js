/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../../../button';
import DialogBox from '../../../dialog-box';

/**
 * External dependencies
 */
import { capitalize } from 'lodash';
import classnames from 'classnames';

/**
 * Styles
 */
import './editor.scss';

export const CONTENT_LIMIT = 100;

const ResultCard = ({
	result,
	isFromPreviousSession,
	isSelected,
	isSelectedText,
	isCustom,
	onInsert,
	onSelect,
	onUseSettings,
	onDelete,
}) => {
	const className = 'maxi-prompt-control-results-card';

	const classes = classnames(
		className,
		isSelected && `${className}--selected`,
		result.error && `${className}--error`
	);

	const ref = useRef();
	const endOfContentRef = useRef();

	const handleCopy = () => {
		navigator.clipboard.writeText(result.content);
	};

	const limitContent = (content, limit = CONTENT_LIMIT) => {
		if (content.length <= limit) {
			return content;
		}

		const lastSpaceIndex = content.lastIndexOf(' ', limit);

		return `${content.substring(0, lastSpaceIndex)}...`;
	};

	const [content, setContent] = useState(limitContent(result.content));
	const [isLimited, setIsLimited] = useState(false);

	useEffect(() => {
		setContent(isSelected ? result.content : limitContent(result.content));
		setIsLimited(
			isSelected ? false : result.content.length > CONTENT_LIMIT
		);

		if (result.loading) {
			endOfContentRef.current.scrollIntoView({
				behavior: 'instant',
				block: 'end',
			});
		}
	}, [result.content]);

	const handleScrollIntoView = () => {
		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	};

	useEffect(() => {
		if (isSelected) {
			handleScrollIntoView();
		}
	}, [isSelected]);

	const transformVerbToPast = verb => {
		if (verb.endsWith('e')) {
			return `${verb}d`;
		}

		return `${verb}ed`;
	};

	return (
		<div className={classes}>
			<div className={`${className}__scroll-to`}>
				<div
					ref={ref}
					className={classnames(
						`${className}__scroll-to__inner`,
						isCustom && `${className}__scroll-to__inner--custom`
					)}
				/>
			</div>
			<div className={`${className}__top-bar`}>
				<div
					className={`${className}__top-bar__select-row`}
					onClick={() => onSelect()}
				>
					<span
						className={`${className}__top-bar__select-row__select-text`}
					>
						{__(
							isSelected
								? `Selected${
										result.isSelectedText ? ' text' : ''
								  }`
								: result.isSelectedText
								? 'Selected text'
								: 'Select',
							'maxi-blocks'
						)}
					</span>
					{isFromPreviousSession && !result.isSelectedText && (
						<span
							className={`${className}__top-bar__select-row__from-previous-session`}
						>
							{__('From previous sessions', 'maxi-blocks')}
						</span>
					)}
					{!result.isSelectedText && (
						<span
							className={`${className}__top-bar__select-row__id`}
						>
							#{result.id}
						</span>
					)}
				</div>
				{result.modificationType && (
					<div
						className={`${className}__modificator`}
						onClick={() => onSelect(result.refId)}
					>
						{__(
							`${capitalize(
								transformVerbToPast(result.modificationType)
							)} from`,
							'maxi-blocks'
						)}{' '}
						{result.refId && (
							<label className={`${className}__modificator__id`}>
								#{result.refId}
							</label>
						)}
						{result.refFromSelectedText && (
							<span
								className={`${className}__modificator__from-selected-text`}
							>
								{__('selected text', 'maxi-blocks')}
							</span>
						)}
					</div>
				)}
			</div>
			<p className={`${className}__content`}>
				{result.error && (
					<span className={`${className}__content__error`}>
						{__('Error: ', 'maxi-blocks')}
					</span>
				)}
				{result.content === '' ? '\u00A0' : content}
			</p>
			<div className={`${className}__end-of-content`}>
				<div
					ref={endOfContentRef}
					className={`${className}__end-of-content__inner`}
				/>
			</div>
			{result.content.length > CONTENT_LIMIT && !result.loading && (
				<Button
					className={`${className}__show-more`}
					onClick={() => {
						const newIsLimited = !isLimited;

						setIsLimited(newIsLimited);

						if (newIsLimited) {
							setContent(limitContent(result.content));
						} else {
							setContent(result.content);
						}

						handleScrollIntoView();
					}}
				>
					{__(`Show ${isLimited ? 'more' : 'less'}`, 'maxi-blocks')}
				</Button>
			)}
			{!result.isSelectedText && (
				<>
					<hr />
					<div className={`${className}__options`}>
						<Button onClick={onInsert}>
							{__(
								isSelectedText ? 'Replace selection' : 'Insert',
								'maxi-blocks'
							)}
						</Button>
						<Button onClick={handleCopy}>
							{__('Copy', 'maxi-blocks')}
						</Button>
						{!result.refFromSelectedText && (
							<Button onClick={onUseSettings}>
								{__('Use settings', 'maxi-blocks')}
							</Button>
						)}
						<DialogBox
							message={__(
								'Are you sure you want to delete the result?',
								'maxi-blocks'
							)}
							cancelLabel={__('Cancel', 'maxi-blocks')}
							confirmLabel={__('Delete', 'maxi-blocks')}
							onConfirm={onDelete}
							buttonClassName={`${className}__clean-history-button`}
							buttonChildren={__('Delete', 'maxi-blocks')}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default ResultCard;
