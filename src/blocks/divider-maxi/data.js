/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { createSelectors } from '../../extensions/styles/custom-css';
import { BoxShadowControl, DividerControl } from '../../components';
import {
	getBoxShadowStyles,
	getDividerStyles,
} from '../../extensions/styles/helpers';
import getCanvasSettings from '../../components/relation-control/getCanvasSettings';
import transitionDefault from '../../extensions/styles/transitions/transitionDefault';

/**
 * Classnames
 */
const dividerWrapperClass = ' .maxi-divider-block';
const dividerClass = `${dividerWrapperClass}__divider`;

const prefix = 'divider-';

/**
 * Data object
 */
const name = 'divider-maxi';
const copyPasteMapping = {
	settings: {
		Alignment: {
			group: {
				'Line orientation': 'line-orientation',
				'Line vertical position': 'line-vertical',
				'Line horizontal position': 'line-horizontal',
			},
			hasBreakpoints: true,
		},
		'Line settings': {
			group: {
				'Line style': 'divider-border-style',
				'Line colour': {
					props: 'divider-border',
					isPalette: true,
				},
				'Line size': ['divider-height', 'divider-width'],
				'Line weight': [
					'divider-border-top-width',
					'divider-border-top-unit',
					'divider-border-right-width',
					'divider-border-right-unit',
				],
			},
			hasBreakpoints: true,
		},
		'Box shadow': {
			template: 'boxShadow',
			prefix: 'divider-',
		},
	},
	canvas: {
		Size: {
			template: 'size',
		},
		Background: {
			template: 'blockBackground',
		},
		Border: {
			template: 'border',
		},
		'Box shadow': {
			template: 'boxShadow',
		},
		Opacity: {
			template: 'opacity',
		},
		'Margin/Padding': {
			template: 'marginPadding',
		},
	},
	advanced: {
		template: 'advanced',
	},
};
const customCss = {
	selectors: {
		...createSelectors({
			canvas: '',
			divider: dividerClass,
		}),
	},
	categories: [
		'canvas',
		'before canvas',
		'after canvas',
		'divider',
		'before divider',
		'after divider',
		'background',
		'background hover',
	],
};
const transition = {
	...transitionDefault,
	block: {
		'box shadow': {
			title: 'Box shadow',
			target: dividerClass,
			property: 'box-shadow',
			prefix,
		},
	},
};
const interactionBuilderSettings = [
	{
		label: __('Divider box shadow', 'maxi-blocks'),
		transitionTarget: transition.block['box shadow'].target,
		hoverProp: 'divider-box-shadow-status-hover',
		attrGroupName: 'boxShadow',
		prefix: 'divider-',
		component: props => <BoxShadowControl {...props} />,
		helper: props => getBoxShadowStyles(props),
		target: dividerClass,
	},
	{
		label: __('Line settings', 'maxi-blocks'),
		attrGroupName: ['divider', 'size'],
		component: props => <DividerControl {...props} />,
		helper: props => getDividerStyles(props.obj, 'line', props.blockStyle),
		target: dividerClass,
	},
	...getCanvasSettings({ name, customCss }),
];

const data = {
	name,
	copyPasteMapping,
	customCss,
	transition,
	interactionBuilderSettings,
};

export { copyPasteMapping, customCss, transition, interactionBuilderSettings };
export default data;
