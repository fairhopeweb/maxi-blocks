/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import { without } from 'lodash';
import loadable from '@loadable/component';

/**
 * Internal dependencies
 */
const AccordionControl = loadable(() =>
	import('../../components/accordion-control')
);
const SettingTabsControl = loadable(() =>
	import('../../components/setting-tabs-control')
);
const ShapeDividerControl = loadable(() =>
	import('./components/shape-divider-control')
);

import { getGroupAttributes } from '../../extensions/styles';
import * as inspectorTabs from '../../components/inspector-tabs';
import { customCss } from './data';
import { withMaxiInspector } from '../../extensions/inspector';

/**
 * Inspector
 */
const Inspector = props => {
	const {
		attributes,
		deviceType,
		maxiSetAttributes,
		insertInlineStyles,
		cleanInlineStyles,
	} = props;
	const { selectors, categories } = customCss;

	const getCategoriesCss = () => {
		const {
			'shape-divider-top-status': shapeDividerTopStatus,
			'shape-divider-bottom-status': shapeDividerBottomStatus,
		} = attributes;
		return without(
			categories,
			!shapeDividerTopStatus && 'top shape divider',
			!shapeDividerBottomStatus && 'bottom shape divider'
		);
	};

	return (
		<InspectorControls>
			{inspectorTabs.blockSettings({
				props,
			})}
			{inspectorTabs.repeaterInfoBox({ props })}
			{inspectorTabs.responsiveInfoBox({ props })}
			<SettingTabsControl
				target='sidebar-settings-tabs'
				disablePadding
				deviceType={deviceType}
				depth={0}
				items={[
					{
						label: __('Settings', 'maxi-blocks'),
						content: (
							<AccordionControl
								isPrimary
								items={[
									...inspectorTabs.calloutArrow({
										props,
									}),
									{
										label: __(
											'Shape divider',
											'maxi-blocks'
										),
										disablePadding: true,
										content: (
											<ShapeDividerControl
												{...getGroupAttributes(
													attributes,
													'shapeDivider'
												)}
												onChangeInline={obj =>
													insertInlineStyles({
														obj,
														target: 'svg',
													})
												}
												onChange={obj => {
													maxiSetAttributes(obj);
													cleanInlineStyles('svg');
												}}
												breakpoint={deviceType}
											/>
										),
									},
									...inspectorTabs.blockBackground({
										props,
									}),
									...inspectorTabs.border({
										props,
									}),
									...inspectorTabs.boxShadow({
										props,
									}),
									...inspectorTabs.size({
										props,
										block: true,
									}),
									...inspectorTabs.marginPadding({
										props,
									}),
								]}
							/>
						),
					},
					{
						label: __('Advanced', 'maxi-blocks'),
						content: (
							<AccordionControl
								isPrimary
								items={[
									deviceType === 'general' && {
										...inspectorTabs.customClasses({
											props,
										}),
									},
									deviceType === 'general' && {
										...inspectorTabs.anchor({
											props,
										}),
									},
									...inspectorTabs.customCss({
										props,
										breakpoint: deviceType,
										selectors,
										categories: getCategoriesCss(),
									}),
									...inspectorTabs.advancedCss({
										props,
									}),
									...inspectorTabs.contextLoop({
										props,
										contentType: 'container',
									}),
									...inspectorTabs.scrollEffects({
										props,
									}),
									...inspectorTabs.transform({
										props,
										selectors,
										categories: getCategoriesCss(),
									}),
									...inspectorTabs.transition({
										props,
										selectors,
									}),
									...inspectorTabs.display({
										props,
									}),
									...inspectorTabs.opacity({
										props,
									}),
									...inspectorTabs.position({
										props,
									}),
									deviceType !== 'general' && {
										...inspectorTabs.responsive({
											props,
										}),
									},
									...inspectorTabs.overflow({
										props,
									}),
									...inspectorTabs.zindex({
										props,
									}),
									...inspectorTabs.flex({
										props,
									}),
									...inspectorTabs.relation({
										props,
									}),
								]}
							/>
						),
					},
				]}
			/>
		</InspectorControls>
	);
};

export default withMaxiInspector(Inspector);
