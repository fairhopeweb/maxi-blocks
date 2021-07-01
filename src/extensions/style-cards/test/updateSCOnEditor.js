import '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { getSCVariablesObject } from '../updateSCOnEditor';

describe('getSCVariablesObject', () => {
	it('Return an object with variables ready to update on `document.documentElement`', () => {
		const styleCards = {
			name: 'Maxi (Default)',
			status: 'active',
			dark: {
				styleCard: {},
				defaultStyleCard: {
					color: {
						1: '#081219',
						2: '#062739',
						3: '#9b9b9b',
						4: '#ff4a17',
						5: '#ffffff',
						6: '#c9340a',
						7: '#f5f5f5',
						global: false,
						color: '',
					},
					p: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '18',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '16',
						'font-size-unit-xl': 'px',
						'line-height-xxl': '1.5',
						'font-weight-general': '400',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h1: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '50',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '45',
						'font-size-unit-xl': 'px',
						'font-size-l': '40',
						'font-size-unit-l': 'px',
						'font-size-m': '36',
						'font-size-unit-m': 'px',
						'font-size-s': '34',
						'font-size-unit-s': 'px',
						'font-size-xs': '32',
						'font-size-unit-xs': 'px',
						'line-height-xxl': 1.18,
						'line-height-xl': 1.1,
						'line-height-l': 1.22,
						'line-height-m': 1.27,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h2: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '44',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '38',
						'font-size-unit-xl': 'px',
						'font-size-l': '36',
						'font-size-unit-l': 'px',
						'font-size-m': '32',
						'font-size-unit-m': 'px',
						'font-size-s': '30',
						'font-size-unit-s': 'px',
						'font-size-xs': '28',
						'font-size-unit-xs': 'px',
						'line-height-xxl': 1.21,
						'line-height-xl': 1.05,
						'line-height-l': 1.26,
						'line-height-m': 1.33,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h3: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '34',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '30',
						'font-size-unit-xl': 'px',
						'font-size-m': '26',
						'font-size-unit-m': 'px',
						'font-size-s': '24',
						'font-size-unit-s': 'px',
						'line-height-xxl': 1.25,
						'line-height-xl': 1.3,
						'line-height-l': 1.23,
						'line-height-m': 1.16,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h4: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '30',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '26',
						'font-size-unit-xl': 'px',
						'font-size-l': '24',
						'font-size-unit-l': 'px',
						'font-size-s': '22',
						'font-size-unit-s': 'px',
						'line-height-xxl': 1.33,
						'line-height-xl': 1.24,
						'line-height-l': 1.38,
						'line-height-m': 1.42,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h5: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '26',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '22',
						'font-size-unit-xl': 'px',
						'font-size-m': '20',
						'font-size-unit-m': 'px',
						'line-height-xxl': 1.36,
						'line-height-xl': 1.26,
						'line-height-l': 1.45,
						'line-height-m': 1.5,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h6: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '24',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '20',
						'font-size-unit-xl': 'px',
						'font-size-m': '18',
						'font-size-unit-m': 'px',
						'line-height-xxl': 1.39,
						'line-height-xl': 1.29,
						'line-height-l': 1.5,
						'line-height-m': 1.56,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					button: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '22',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '18',
						'font-size-unit-xl': 'px',
						'font-size-l': '16',
						'font-size-unit-l': 'px',
						'line-height-xxl': 1.5,
						'line-height-xl': 1.625,
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'font-weight-general': '400',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'text-decoration-general': 'unset',
						'background-color-global': false,
						'background-color': '',
					},
					hover: {
						'color-global': false,
						color: '',
					},
					icon: {
						'line-global': false,
						line: '',
						'fill-global': false,
						fill: '',
					},
					divider: {
						'color-global': false,
						color: '',
					},
					link: {
						'link-color-global': false,
						'link-color': '',
						'hover-color-global': false,
						'hover-color': '',
						'active-color-global': false,
						'active-color': '',
						'visited-color-global': false,
						'visited-color': '',
					},
				},
			},
			light: {
				styleCard: {
					p: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '18',
						'font-size-unit-xxl': 'px',
						'font-size-xl': 16,
						'font-size-unit-xl': 'px',
						'line-height-xxl': 1.5,
						'line-height-xl': 1.625,
						'font-weight-general': '400',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
				},
				defaultStyleCard: {
					color: {
						1: '#ffffff',
						2: '#f2f9fd',
						3: '#9b9b9b',
						4: '#ff4a17',
						5: '#000000',
						6: '#c9340a',
						7: '#081219',
					},
					p: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '18',
						'font-size-unit-xxl': 'px',
						'font-size-xl': 15,
						'font-size-unit-xl': 'px',
						'line-height-xxl': 1.5,
						'line-height-xl': 1.625,
						'font-weight-general': '400',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h1: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '50',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '45',
						'font-size-unit-xl': 'px',
						'font-size-l': '40',
						'font-size-unit-l': 'px',
						'font-size-m': '36',
						'font-size-unit-m': 'px',
						'font-size-s': '34',
						'font-size-unit-s': 'px',
						'font-size-xs': '32',
						'font-size-unit-xs': 'px',
						'line-height-xxl': 1.18,
						'line-height-xl': 1.1,
						'line-height-l': 1.22,
						'line-height-m': 1.27,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h2: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '44',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '38',
						'font-size-unit-xl': 'px',
						'font-size-l': '36',
						'font-size-unit-l': 'px',
						'font-size-m': '32',
						'font-size-unit-m': 'px',
						'font-size-s': '30',
						'font-size-unit-s': 'px',
						'font-size-xs': '28',
						'font-size-unit-xs': 'px',
						'line-height-xxl': 1.21,
						'line-height-xl': 1.05,
						'line-height-l': 1.26,
						'line-height-m': 1.33,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h3: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '34',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '30',
						'font-size-unit-xl': 'px',
						'font-size-l': '30',
						'font-size-unit-l': 'px',
						'font-size-m': '26',
						'font-size-unit-m': 'px',
						'font-size-s': '24',
						'font-size-unit-s': 'px',
						'line-height-xxl': 1.25,
						'line-height-xl': 1.3,
						'line-height-l': 1.23,
						'line-height-m': 1.16,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h4: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '30',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '26',
						'font-size-unit-xl': 'px',
						'font-size-l': '24',
						'font-size-unit-l': 'px',
						'font-size-s': '22',
						'font-size-unit-s': 'px',
						'line-height-xxl': 1.33,
						'line-height-xl': 1.24,
						'line-height-l': 1.38,
						'line-height-m': 1.42,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h5: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '28',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '22',
						'font-size-unit-xl': 'px',
						'font-size-m': '20',
						'font-size-unit-m': 'px',
						'line-height-xxl': 1.36,
						'line-height-xl': 1.26,
						'line-height-l': 1.45,
						'line-height-m': 1.5,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					h6: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '24',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '20',
						'font-size-unit-xl': 'px',
						'font-size-m': '18',
						'font-size-unit-m': 'px',
						'line-height-xxl': 1.39,
						'line-height-xl': 1.29,
						'line-height-l': 1.5,
						'line-height-m': 1.56,
						'font-weight-general': '500',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
					},
					button: {
						'color-global': false,
						color: '',
						'font-family-general': 'Roboto',
						'font-size-xxl': '22',
						'font-size-unit-xxl': 'px',
						'font-size-xl': '18',
						'font-size-unit-xl': 'px',
						'font-size-l': '16',
						'font-size-unit-l': 'px',
						'line-height-xxl': 1.5,
						'line-height-xl': 1.625,
						'font-weight-general': '400',
						'text-transform-general': 'none',
						'font-style-general': 'normal',
						'letter-spacing-xxl': '0',
						'letter-spacing-unit-xxl': 'px',
						'letter-spacing-xl': '0',
						'letter-spacing-unit-xl': 'px',
						'text-decoration-general': 'unset',
						'background-color-global': false,
						'background-color': '',
					},
					hover: {
						'color-global': false,
						color: '',
					},
					icon: {
						'line-global': false,
						line: '',
						'fill-global': false,
						fill: '',
					},
					divider: {
						'color-global': false,
						color: '',
					},
					link: {
						'link-color-global': false,
						'link-color': '',
						'hover-color-global': false,
						'hover-color': '',
						'active-color-global': false,
						'active-color': '',
						'visited-color-global': false,
						'visited-color': '',
					},
				},
			},
		};

		const result = getSCVariablesObject(styleCards);

		expect(result).toMatchSnapshot();
	});
});
