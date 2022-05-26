/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import { getAttributes, openSidebarTab } from '../../../../utils';

describe('Icon position', () => {
	it('Check icon position', async () => {
		await createNewPost();
		await insertBlock('Button Maxi');

		await openSidebarTab(page, 'style', 'quick styles');

		// select icon button
		await page.$eval(
			'.maxi-button-default-styles .maxi-default-styles-control__button[aria-label="Button shortcut 4"]',
			button => button.click()
		);

		// select icon position
		await page.$eval(
			'.toolbar-wrapper.icon-toolbar .toolbar-item__icon-position',
			button => button.click()
		);

		// select position
		const position = await page.$(
			'.toolbar-item__icon-position__popover .maxi-icon__position select'
		);

		await position.select('left');

		expect(await getAttributes('icon-position')).toStrictEqual('left');

		// Check changes in sidebar
		await openSidebarTab(page, 'style', 'icon');

		const positionSelected = await page.$eval(
			'.maxi-tabs-content .maxi-icon-control .maxi-icon-position-control .maxi-tabs-control__button--selected',
			button => button.outerText
		);

		expect(positionSelected).toStrictEqual('Left');
	});
});
