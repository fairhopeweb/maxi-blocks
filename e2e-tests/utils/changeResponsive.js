const changeResponsive = async (page, size) => {
	await page.$eval(
		'.edit-post-header .edit-post-header__toolbar .maxi-toolbar-layout button',
		button => button.click()
	);

	if (size !== 'base') {
		const responsive = ['xxl', 'xl', 'l', 'm', 's', 'xs'];
		const sizeIndex = responsive.indexOf(size);

		await page.$$eval(
			'.maxi-responsive-selector button',
			(buttons, _sizeIndex) => buttons[_sizeIndex].click(),
			sizeIndex
		);
	} else
		await page.$eval('.maxi-responsive-selector__base button', button =>
			button.click()
		);

	await page.$eval('.maxi-responsive-selector span', closeButton =>
		closeButton.click()
	);
};

export default changeResponsive;
