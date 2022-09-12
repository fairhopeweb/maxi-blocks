/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { cloneElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SettingTabsControl from '../setting-tabs-control';
import { setScreenSize } from '../../extensions/styles';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Styles
 */
import './editor.scss';

/**
 * Component
 */
const ResponsiveTabsControl = props => {
	const {
		className,
		children,
		breakpoint,
		disableCallback = false,
		target,
	} = props;

	const { baseBreakpoint } = useSelect(select => {
		const { receiveBaseBreakpoint } = select('maxiBlocks');

		const baseBreakpoint = receiveBaseBreakpoint();

		return {
			baseBreakpoint,
		};
	});

	const breakpoints = ['XXL', 'XL', 'L', 'M', 'S', 'XS'];

	const classes = classnames('maxi-responsive-tabs-control', className);

	const getTextOptionsTab = () => {
		if (breakpoint !== 'general')
			return breakpoints.indexOf(breakpoint.toUpperCase());

		if (!baseBreakpoint) return null;

		return breakpoints.indexOf(baseBreakpoint.toUpperCase());
	};

	const showNotification = customBreakpoint => {
		return baseBreakpoint === customBreakpoint.toLowerCase();
	};

	return (
		<SettingTabsControl
			className={classes}
			items={breakpoints.map(breakpoint => {
				return {
					label: breakpoint,
					content: cloneElement(children, {
						breakpoint:
							baseBreakpoint === breakpoint.toLowerCase()
								? 'general'
								: breakpoint.toLowerCase(),
					}),
					// content: children,
					showNotification: showNotification(breakpoint),
					callback: () =>
						!disableCallback
							? baseBreakpoint === breakpoint.toLowerCase()
								? setScreenSize('general')
								: setScreenSize(breakpoint.toLowerCase())
							: null,
					breakpoint: breakpoint.toLowerCase(),
				};
			})}
			forceTab={getTextOptionsTab()}
			target={target}
		/>
	);
};

export default ResponsiveTabsControl;
