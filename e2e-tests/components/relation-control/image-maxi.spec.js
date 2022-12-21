/**
 * WordPress dependencies
 */
import { createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
/**
 * Internal dependencies
 */
import {
	openSidebarTab,
	addImageToImageMaxi,
	getAttributes,
	openPreviewPage,
} from '../../utils';

describe('Image Maxi hover simple actions', () => {
	beforeEach(async () => {
		await createNewPost();
		await insertBlock('Image Maxi');
		const imageBlock = await page.$('.maxi-image-block');
		await addImageToImageMaxi(page, imageBlock);

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
		await selectControls[1].select('image-maxi-1');

		// Add action
		selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[2].select('hover');
	});

	const checkFrontend = async () => {
		const previewPage = await openPreviewPage(page);
		await previewPage.waitForSelector('.entry-content');

		await previewPage.waitForSelector(
			'#button-maxi-1 .maxi-button-block__button'
		);
		await previewPage.hover('#button-maxi-1 .maxi-button-block__button');
		await previewPage.waitForTimeout(100);

		await previewPage.waitForSelector('#relations--image-maxi-1-styles');
		const stylesCSS = await previewPage.$eval(
			'#relations--image-maxi-1-styles',
			el => el.textContent
		);
		expect(stylesCSS).toMatchSnapshot();

		await previewPage.waitForSelector(
			'#relations--image-maxi-1-transitions'
		);
		const transitionsCSS = await previewPage.$eval(
			'#relations--image-maxi-1-transitions',
			el => el.textContent
		);
		expect(transitionsCSS).toMatchSnapshot();
	};

	it('Alignment', async () => {
		const selectControls = await page.$$('.maxi-select-control__input');
		await selectControls[3].select('Alignment');

		await page.$eval(
			'.maxi-alignment-control .maxi-tabs-control__button.maxi-tabs-control__button-right',
			button => button.click()
		);
		expect(await getAttributes('relations')).toMatchSnapshot();

		await checkFrontend();
	});

	// TODO: shape mask (need)
});
