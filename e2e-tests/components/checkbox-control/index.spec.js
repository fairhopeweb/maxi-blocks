/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
/**
 * Internal dependencies
 */
import { openSidebarTab, getAttributes } from '../../utils';

describe('CheckBoxControl', () => {
	it('checking the checkbox control', async () => {
		await createNewPost();
		await insertBlock('Text Maxi');
		const accordionPanel = await openSidebarTab(
			page,
			'style',
			'height width'
		);

		// use checkbox
		await accordionPanel.$eval(
			'.maxi-full-size-control .maxi-full-width-toggle .maxi-toggle-switch__toggle input',
			checkBox => checkBox.click()
		);

		// use checkbox
		await page.$eval(
			'.maxi-full-size-control .maxi-full-size-control__force-aspect-ratio input',
			checkBox => checkBox.click()
		);

		expect(await getAttributes('full-width-general')).toStrictEqual('full');
		expect(await getAttributes('force-aspect-ratio-general')).toStrictEqual(
			true
		);
	});
});
