/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
	pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	openSidebarTab,
	editColorControl,
	getAttributes,
	addTypographyOptions,
	addTypographyStyle,
	openPreviewPage,
} from '../../utils';

describe('Button Maxi hover simple actions', () => {
	beforeEach(async () => {
		await createNewPost();
		await insertBlock('Button Maxi');

		// Add icon
		await openSidebarTab(page, 'style', 'quick styles');
		await page.$$eval('.maxi-default-styles-control__button', buttons =>
			buttons[3].click()
		);

		await insertBlock('Button Maxi');
		await openSidebarTab(page, 'advanced', 'interaction builder');

		// Add interaction
		await page.waitForSelector('.maxi-relation-control__button');
		await page.$eval('.maxi-relation-control__button', el => el.click());

		// Add title
		const textControls = await page.$$('.maxi-text-control__input');
		await textControls[1].focus();
		await page.keyboard.type('Hello World!');
		await page.waitForTimeout(150);

		// Add target
		let selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[1].select('button-maxi-1');

		// Add action
		selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[2].select('hover');
	});

	const checkFrontend = async () => {
		const previewPage = await openPreviewPage(page);
		await previewPage.waitForSelector('.entry-content');

		await previewPage.waitForSelector(
			'#button-maxi-2 .maxi-button-block__button'
		);
		await previewPage.hover('#button-maxi-2 .maxi-button-block__button');

		await previewPage.waitForSelector('#relations--button-maxi-1-styles');
		const stylesCSS = await previewPage.$eval(
			'#relations--button-maxi-1-styles',
			el => el.textContent
		);
		expect(stylesCSS).toMatchSnapshot();

		await previewPage.waitForSelector(
			'#relations--button-maxi-1-transitions'
		);
		const transitionsCSS = await previewPage.$eval(
			'#relations--button-maxi-1-transitions',
			el => el.textContent
		);
		expect(transitionsCSS).toMatchSnapshot();
	};

	it('Button icon', async () => {
		// Select setting
		let selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Button icon');

		// Width
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[0].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('11');

		const ANCs = await page.$$(
			'.maxi-advanced-number-control .maxi-select-control__input'
		);
		await ANCs[0].select('%');

		// Stroke width
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[1].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('22');

		// Spacing
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[2].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('33');

		// Icon position
		await page.$eval(
			'.maxi-tabs-control__button.maxi-tabs-control__button-bottom',
			el => el.focus()
		);

		// Icon stroke color
		let colorControls = await page.$$('.maxi-color-control');
		await editColorControl({
			page,
			instance: await colorControls[0],
			paletteStatus: true,
			colorPalette: 8,
			opacity: 50,
		});

		// Icon background color
		colorControls = await page.$$('.maxi-color-control');
		await editColorControl({
			page,
			instance: await colorControls[1],
			paletteStatus: true,
			colorPalette: 5,
			opacity: 75,
		});

		// Icon padding
		selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[5].select('%');

		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[5].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('44');

		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});

	it('Button typography', async () => {
		// Select setting
		const selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Button typography');

		// Change font family
		await page.$eval(
			'.maxi-typography-control .maxi-typography-control__font-family',
			input => input.click()
		);
		await page.keyboard.type('Montserrat');
		await page.keyboard.press('Enter');
		await page.waitForTimeout(150);

		// Change font color
		await editColorControl({
			page,
			instance: await page.$('.maxi-color-control'),
			paletteStatus: true,
			colorPalette: 8,
			opacity: 50,
		});

		await addTypographyOptions({
			page,
			instance: await page.$('.maxi-typography-control'),
			size: 24,
			lineHeight: 60,
			letterSpacing: 15,
		});

		await addTypographyStyle({
			page,
			instance: await page.$('.maxi-typography-control'),
			weight: 800,
			transform: 'capitalize',
			style: 'italic',
			decoration: 'underline',
			orientation: 'sideways',
			direction: 'rtl',
			indent: 20,
		});

		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});

	it('Button border', async () => {
		// Select setting
		let selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Button border');

		// Select first default
		await page.$$eval('.maxi-default-styles-control__button', buttons =>
			buttons[1].click()
		);

		// Border color
		await editColorControl({
			page,
			instance: await page.$('.maxi-color-control'),
			paletteStatus: true,
			colorPalette: 8,
			opacity: 50,
		});

		// Border width
		selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[5].select('%');

		// Border radius
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[2].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('11');

		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});

	it('Button background', async () => {
		// Select setting
		const selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Button background');

		// Background color
		await editColorControl({
			page,
			instance: await page.$('.maxi-color-control'),
			paletteStatus: true,
			colorPalette: 8,
			opacity: 50,
		});

		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});

	it('Button shadow', async () => {
		// Select setting
		const selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Button box shadow');

		// Select first default
		await page.$$eval('.maxi-default-styles-control__button', buttons =>
			buttons[1].click()
		);

		// Shadow color
		await editColorControl({
			page,
			instance: await page.$('.maxi-color-control'),
			paletteStatus: true,
			colorPalette: 8,
			opacity: 11,
		});

		// Shadow horizontal offset
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[1].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('22');

		// Shadow vertical offset
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[2].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('33');

		// Shadow blur
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[3].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('44');

		// Shadow spread
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[4].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('55');

		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});

	it('Button margin/padding', async () => {
		// Select setting
		const selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Button margin/padding');

		// Margin
		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[0].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('11');

		// Padding
		await page.$$eval('.maxi-tabs-control', tabs =>
			tabs[5]
				.querySelector(
					'.maxi-tabs-control__button.maxi-tabs-control__button-all'
				)
				.click()
		);

		await page.$$eval(
			'.maxi-advanced-number-control .maxi-advanced-number-control__value',
			ANCs => ANCs[1].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('22');

		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});
});
