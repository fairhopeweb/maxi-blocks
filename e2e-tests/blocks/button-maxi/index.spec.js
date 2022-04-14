/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
	getEditedPostContent,
	pressKeyWithModifier,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	getBlockStyle,
	openSidebarTab,
	getAttributes,
	editColorControl,
} from '../../utils';

describe('Button Maxi', () => {
	it('Button Maxi does not break', async () => {
		await createNewPost();
		await insertBlock('Button Maxi');

		await page.keyboard.type('Hello', { delay: 100 });
		await page.waitForTimeout(150);

		expect(await getEditedPostContent()).toMatchSnapshot();

		expect(await getBlockStyle(page)).toMatchSnapshot();
	});

	it('Button Style', async () => {
		await openSidebarTab(page, 'style', 'style shortcut');

		const buttons = await page.$$('.maxi-button-default-styles button');
		await buttons[4].click();

		await expect(await getEditedPostContent()).toMatchSnapshot();

		expect(await getBlockStyle(page)).toMatchSnapshot();
	});

	it.skip('Check Button Icon', async () => {
		await openSidebarTab(page, 'style', 'icon');

		// Width spacing
		await page.$$eval(
			'.maxi-tabs-content .maxi-icon-control .maxi-advanced-number-control input',
			select => select[0].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('343');

		//  stroke Width
		await page.$$eval(
			'.maxi-tabs-content .maxi-icon-control .maxi-advanced-number-control input',
			select => select[2].focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('2');

		// spacing
		await page.$$eval(
			'.maxi-tabs-content .maxi-icon-control .maxi-advanced-number-control input',
			select => select[4].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('14');

		const attributes = await getAttributes([
			'icon-width-general',
			'icon-stroke-general',
			'icon-spacing-general',
		]);

		const expectedAttributesTwo = {
			'icon-width-general': 343,
			'icon-stroke-general': 2,
			'icon-spacing-general': 14,
		};

		expect(attributes).toStrictEqual(expectedAttributesTwo);

		// icon color
		await editColorControl({
			page,
			instance: await page.$('.maxi-color-palette-control'),
			paletteStatus: true,
			colorPalette: 5,
		});

		await page.$$eval(
			'.maxi-icon-styles-control .maxi-tabs-control__full-width button',
			button => button[1].click()
		);

		await editColorControl({
			page,
			instance: await page.$('.maxi-color-palette-control'),
			paletteStatus: true,
			colorPalette: 6,
		});

		expect(await getAttributes('icon-palette-color')).toStrictEqual(5);
		expect(
			await getAttributes('icon-border-palette-color-general')
		).toStrictEqual(6);

		// icon position
		await page.$eval('.maxi-icon-position-control button', leftButton =>
			leftButton.click()
		);
		expect(await getAttributes('icon-position')).toStrictEqual('left');

		// border
		await page.$$eval(
			'.maxi-border-control .maxi-default-styles-control button',
			button => button[2].click()
		);

		expect(await getAttributes('icon-border-style-general')).toStrictEqual(
			'dashed'
		);

		// border color
		await editColorControl({
			page,
			instance: await page.$('.maxi-border-control'),
			paletteStatus: true,
			colorPalette: 4,
		});

		expect(
			await getAttributes('icon-border-palette-color-general')
		).toStrictEqual(4);

		// border width
		await page.$$eval(
			'.maxi-axis-control__content__item__border-width input',
			input => input[0].focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('59');

		expect(
			await getAttributes('icon-border-bottom-width-general')
		).toStrictEqual(59);

		// check border radius
		await page.$$eval(
			'.maxi-axis-control__content__item__border-radius input',
			input => input[0].focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('26');

		expect(
			await getAttributes('icon-border-bottom-right-radius-general')
		).toStrictEqual(26);

		// icon padding
		await page.$$eval(
			'.maxi-axis-control__content__item__icon-padding input',
			input => input[0].focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('33');

		expect(
			await getAttributes('icon-padding-bottom-general')
		).toStrictEqual(33);
	});

	it.skip('Check Button Icon Hover', async () => {
		const accordion = await openSidebarTab(page, 'style', 'icon');

		await accordion.$$eval(
			'.maxi-settingstab-control .maxi-tabs-control button',
			button => button[1].click()
		);
		await page.waitForTimeout(150);

		// Width spacing
		await page.$$eval(
			'.maxi-icon-control .maxi-advanced-number-control input',
			select => select[0].focus()
		);
		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('245');

		//  stroke Width
		await page.$$eval(
			'.maxi-icon-control .maxi-advanced-number-control input',
			select => select[2].focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('4');

		expect(await getAttributes('icon-stroke-general-hover')).toStrictEqual(
			4
		);
		expect(await getAttributes('icon-width-general-hover')).toStrictEqual(
			245
		);

		// select border
		await page.$$eval(
			'.maxi-icon-styles-control .maxi-tabs-control__full-width button',
			button => button[1].click()
		);

		await page.$$eval(
			'.maxi-border-control .maxi-default-styles-control button',
			button => button[3].click()
		);

		expect(
			await getAttributes('icon-border-style-general-hover')
		).toStrictEqual('dotted');

		await accordion.$eval(
			'.maxi-border-control .maxi-color-control .maxi-toggle-switch__toggle input',
			button => button.click()
		);
		// border color
		await editColorControl({
			page,
			instance: await page.$('.maxi-border-control'),
			paletteStatus: true,
			colorPalette: 5,
		});

		expect(
			await getAttributes('icon-border-palette-color-general-hover')
		).toStrictEqual(5);

		// border width
		await page.$$eval(
			'.maxi-axis-control__content__item__border-width input',
			input => input[0].focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('70');

		expect(
			await getAttributes('icon-border-bottom-width-general-hover')
		).toStrictEqual(70);
	});
});
