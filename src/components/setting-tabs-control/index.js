/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../button';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * Styles and icons
 */
import './editor.scss';

/**
 * Component
 */
const SettingTabsControl = props => {
	const {
		items,
		disablePadding = false,
		className,
		forceTab,
		returnValue,
		callback,
		target,
		onChange,
		type = 'tabs',
		selected,
	} = props;

	const [tab, setTab] = useState(0);

	useEffect(() => {
		if (forceTab || forceTab === 0) {
			setTab(forceTab);
		}
	}, [forceTab]);

	useEffect(() => {
		if (returnValue) returnValue(items[tab]);
	}, [tab]);

	const classes = classnames('maxi-settingstab-control', className);

	const classesControl = classnames(
		'maxi-tabs-control',
		target && `maxi-tabs-control__${target}`,
		disablePadding ? 'maxi-tabs-control--disable-padding' : null
	);

	const classesContent = classnames(
		'maxi-tabs-content',
		disablePadding ? 'maxi-tabs-content--disable-padding' : null
	);

	return (
		<div className={classes}>
			<div className={classesControl}>
				{items.map((item, i) => {
					if (item) {
						const label = !isEmpty(item.label)
							? item.label
							: item.value;
						return (
							<Button
								key={`maxi-tabs-control__button-${label}`}
								label={item.value}
								className={classnames(
									'maxi-tabs-control__button',
									selected === item.value &&
										'maxi-tabs-control__button--selected'
								)}
								onClick={() => {
									setTab(i);

									if (callback) callback(item, i);
									if (item.callback) item.callback();

									type === 'buttons' && onChange(item.value);
								}}
								aria-pressed={
									type === 'tabs'
										? tab === i
										: selected === item.value
								}
							>
								{!isEmpty(item.label) && item.label}
								{!isEmpty(item.icon) && item.icon}
								{item.showNotification && (
									<svg
										className='maxi-tabs-control__notification'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 9 9'
									>
										<path
											fill='#ff4a17'
											d='M4.5 0H9v4.5A4.5 4.5 0 0 1 4.5 9 4.5 4.5 0 0 1 0 4.5 4.5 4.5 0 0 1 4.5 0Z'
										/>
									</svg>
								)}
							</Button>
						);
					}

					return null;
				})}
			</div>
			{type === 'tabs' && (
				<div className={classesContent}>
					{items.map((item, i) => {
						const label = !isEmpty(item.label)
							? item.label
							: item.value;

						if (item && i === tab) {
							const classesItemContent = classnames(
								'maxi-tab-content',
								tab === i ? 'maxi-tab-content--selected' : ''
							);

							return (
								<div
									key={`maxi-tab-content-${label}`}
									className={classesItemContent}
								>
									{item.content}
								</div>
							);
						}

						return null;
					})}
				</div>
			)}
		</div>
	);
};

export default SettingTabsControl;
