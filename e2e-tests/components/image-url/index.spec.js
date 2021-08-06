/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
/**
 * Internal dependencies
 */
import { getBlockAttributes } from '../../utils';

describe('ImageURL', () => {
	beforeEach(async () => {
		await createNewPost();
		await insertBlock('Image Maxi');
	});
	it('Check imageUrl', async () => {
		// select img
		await page.$eval(
			'.maxi-image-block__placeholder .maxi-editor-url-input__button button',
			url => url.click()
		);

		await page.$eval(
			'.maxi-editor-url-input__button-modal .block-editor-url-input__input',
			input => input.focus()
		);

		const linkImage =
			'https://www.landuum.com/wp-content/uploads/2019/03/cultura_paisajeiluminado_landuum5.jpg';

		await page.keyboard.type(linkImage);

		await page.$$eval(
			'.maxi-image-block__placeholder .maxi-editor-url-input__button .maxi-editor-url-input__button-modal-line button',
			submitUrl => submitUrl[0].click()
		);

		const expectResult = linkImage;
		const getImageUrl = await getBlockAttributes();
		const getImage = getImageUrl.externalUrl;

		expect(getImage).toStrictEqual(expectResult);
	});

	it('Check invalid imageUrl', async () => {
		console.error = jest.fn();

		// select img
		await page.$eval(
			'.maxi-image-block__placeholder .maxi-editor-url-input__button button',
			url => url.click()
		);

		await page.keyboard.type(
			'https://www.testImage/this/image/does/not/exist.jpg'
		);

		await page.$$eval(
			'.maxi-image-block__placeholder .maxi-editor-url-input__button .maxi-editor-url-input__button-modal-line button',
			submitUrl => submitUrl[0].click()
		);

		const error = await page.$eval(
			'.maxi-image-block__placeholder .maxi-editor-url-input__button .maxi-editor-url-input__warning',
			expectHtml => expectHtml.innerHTML
		);

		expect(error).toMatchSnapshot();
	});
});
