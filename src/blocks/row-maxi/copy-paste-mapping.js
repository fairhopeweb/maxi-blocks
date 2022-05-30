const copyPasteMapping = {
	_order: [
		'Row settings',
		'Background',
		'Border',
		'Box shadow',
		'Size',
		'Margin/Padding',
	],

	settings: {
		blockSpecific: {
			size: {
				groupLabel: 'Size',
				props: {
					blockFullWidth: 'Full width',
					size: { label: 'Size', type: 'withoutPrefix' },
				},
			},
		},
		withBreakpoint: {
			rowSettings: {
				groupLabel: 'Row settings',
				props: {
					'row-pattern': 'Row pattern',
					'row-gap': {
						label: 'Row gap',
						props: ['row-gap', 'row-gap-unit'],
					},
					'column-gap': {
						label: 'Column gap',
						props: ['column-gap', 'column-gap-unit'],
					},
					'flex-wrap': 'Flex wrap',
				},
			},
		},
		withoutPrefix: {
			blockBackground: 'Background',
			border: {
				groupLabel: 'Border',
				props: {
					border: 'Border',
					borderWidth: 'Border width',
					borderRadius: 'Border radius',
					borderHover: 'Border hover',
					borderWidthHover: 'Border width hover',
					borderRadiusHover: 'Border radius hover',
				},
			},
			boxShadow: {
				groupLabel: 'Box shadow',
				props: {
					boxShadow: 'Box shadow',
					boxShadowHover: 'Box shadow hover',
				},
			},
			'margin-padding': {
				groupLabel: 'Margin/Padding',
				props: { margin: 'Margin', padding: 'Padding' },
			},
		},
	},
	advanced: {
		blockSpecific: {
			extraClassName: 'Custom CSS classes',
			anchorLink: {
				label: 'Anchor',
				value: ['anchorLink', 'linkSettings'],
			},
			relations: 'Interaction',
		},
		withoutPrefix: {
			breakpoints: 'Breakpoints',
			customCss: 'Custom CSS',
			scroll: 'Scroll effects',
			transform: 'Transform',
			transition: 'Hyperlink hover transition',
			display: 'Show/hide block',
			opacity: 'Opacity',
			position: 'Position',
			overflow: 'Overflow',
			flex: 'Flexbox',
			zIndex: 'Z-index',
		},
	},
};

export default copyPasteMapping;
