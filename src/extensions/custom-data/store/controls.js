/**
 * WordPress dependencies
 */
const { apiFetch } = wp;
const { select } = wp.data;

/**
 * Controls
 */
const controls = {
	async RECEIVE_CUSTOM_DATA() {
		const id = select('core/editor').getCurrentPostId();

		return apiFetch({ path: `/maxi-blocks/v1.0/custom-data/${id}` });
	},
	async SAVE_CUSTOM_DATA(action) {
		const id = select('core/editor').getCurrentPostId();

		await apiFetch({
			path: '/maxi-blocks/v1.0/custom-data',
			method: 'POST',
			data: {
				id,
				data: JSON.stringify(action.data),
				update: action.update,
			},
		});
	},
};

export default controls;
