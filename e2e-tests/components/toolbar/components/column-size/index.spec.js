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
import { getAttributes, openSidebarTab } from '../../../../utils';

describe('Column size from Toolbar', () => {
	it('Test column size from toolbar', async () => {
		await createNewPost();
		await insertBlock('Container Maxi');

		// Wait for toolbar to be visible
		await page.waitForSelector('.toolbar-wrapper');

		await page.$eval('.maxi-row-block__template button', button =>
			button.click()
		);

		// column size
		await page.$eval(
			'.toolbar-wrapper .toolbar-item__button.toolbar-item__size',
			button => button.click()
		);

		// change column size
		await page.$eval(
			'.toolbar-item__size__popover .maxi-advanced-number-control input',
			button => button.focus()
		);

		await pressKeyWithModifier('primary', 'a');
		await page.keyboard.type('365');

		expect(await getAttributes('width-general')).toStrictEqual(365);

		// Check changes in sidebar
		await openSidebarTab(page, 'style', 'height width');

		const columnSize = await page.$eval(
			'.maxi-full-size-control .maxi-full-size-control__width input',
			select => select.value
		);

		expect(columnSize).toStrictEqual('365');
	});
});
