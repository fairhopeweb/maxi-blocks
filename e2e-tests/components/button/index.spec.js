/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
/**
 * Internal dependencies
 */
import { getBlockAttributes, openSidebarTab, getBlockStyle } from '../../utils';

describe('Button', () => {
	it('Check button', async () => {
		await createNewPost();
		await insertBlock('Text Maxi');
		await openSidebarTab(page, 'style', 'alignment');

		await page.$$eval('.maxi-alignment-control button', click =>
			click[1].click()
		);

		const alignment = 'center';
		const attributes = await getBlockAttributes();
		const attribute = attributes['text-alignment-general'];

		expect(attribute).toStrictEqual(alignment);

		expect(await getBlockStyle(page)).toMatchSnapshot();
	});
});
