/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * Source constants
 */
export const sourceOptions = [
	{
		label: __('WordPress', 'maxi-blocks'),
		value: 'wp',
	},
];

/**
 * Type constants
 */
export const generalTypeOptions = [
	{ label: __('Post', 'maxi-blocks'), value: 'posts' },
	{ label: __('Page', 'maxi-blocks'), value: 'pages' },
	{ label: __('Site', 'maxi-blocks'), value: 'settings' },
	{ label: __('Media', 'maxi-blocks'), value: 'media' },
	{ label: __('Author', 'maxi-blocks'), value: 'users' }, // TODO: add author support
	{ label: __('Categories', 'maxi-blocks'), value: 'categories' },
	{ label: __('Tags', 'maxi-blocks'), value: 'tags' },
];

export const imageTypeOptions = generalTypeOptions.filter(
	option => !['categories', 'tags'].includes(option.value)
);

export const ACFTypeOptions = generalTypeOptions.filter(
	option => !['settings'].includes(option.value)
);

export const WCTypeOptions = [
	{ label: __('Product', 'maxi-blocks'), value: 'products' },
	{ label: __('Cart', 'maxi-blocks'), value: 'cart' },
	{
		label: __('Product categories', 'maxi-blocks'),
		value: 'product_categories',
	},
	{ label: __('Product tags', 'maxi-blocks'), value: 'product_tags' },
];

export const typeOptions = {
	text: generalTypeOptions,
	button: generalTypeOptions,
	image: imageTypeOptions,
	container: generalTypeOptions,
	row: generalTypeOptions,
	column: generalTypeOptions,
	group: generalTypeOptions,
	pane: generalTypeOptions,
	slide: generalTypeOptions,
	accordion: generalTypeOptions,
	slider: generalTypeOptions,
	acf: ACFTypeOptions,
};

/**
 * Relation constants
 */
const generalRelationOptionsPosts = [
	{ label: __('Get by id', 'maxi-blocks'), value: 'by-id' },
	{ label: __('Get random'), value: 'random' },
	{ label: __('Get by date'), value: 'by-date' },
	{ label: __('Get alphabetical'), value: 'alphabetical' },
	{ label: __('Get by author'), value: 'by-author' },
	{ label: __('Get by category'), value: 'by-category' },
	{ label: __('Get by tag', 'maxi-blocks'), value: 'by-tag' },
	{ label: __('Get current', 'maxi-blocks'), value: 'current' },
	// { label: __('Date', 'maxi-blocks'), value: 'date' },	// TODO: add date support
	// { label: __('Modified', 'maxi-blocks'), value: 'modified' },	// TODO: add modified support
];

const generalRelationOptionsPages = [
	{ label: __('Get by id', 'maxi-blocks'), value: 'by-id' },
	{ label: __('Get random', 'maxi-blocks'), value: 'random' },
	{ label: __('Get by date', 'maxi-blocks'), value: 'by-date' },
	{ label: __('Get alphabetical', 'maxi-blocks'), value: 'alphabetical' },
	{ label: __('Get by author', 'maxi-blocks'), value: 'by-author' },
	{ label: __('Get current', 'maxi-blocks'), value: 'current' },
];

const generalRelationOptionsUsers = [
	{ label: __('Get by id', 'maxi-blocks'), value: 'by-id' },
	{ label: __('Get random', 'maxi-blocks'), value: 'random' },
	{ label: __('Get by date', 'maxi-blocks'), value: 'by-date' },
	{ label: __('Get alphabetical', 'maxi-blocks'), value: 'alphabetical' },
];

const generalRelationOptionsCategories = [
	{ label: __('Get by id', 'maxi-blocks'), value: 'by-id' },
	{ label: __('Get random', 'maxi-blocks'), value: 'random' },
];

const generalRelationOptionsTags = [
	{ label: __('Get by id', 'maxi-blocks'), value: 'by-id' },
	{ label: __('Get random', 'maxi-blocks'), value: 'random' },
];

const generalRelationOptionsProducts = generalRelationOptionsPosts.filter(
	relation => relation.value !== 'current'
);

const generalRelationOptions = {
	posts: generalRelationOptionsPosts,
	pages: generalRelationOptionsPages,
	settings: generalRelationOptionsPosts,
	media: generalRelationOptionsPosts,
	users: generalRelationOptionsUsers,
	categories: generalRelationOptionsCategories,
	tags: generalRelationOptionsTags,
	products: generalRelationOptionsProducts,
	cart: generalRelationOptionsPosts,
	product_categories: generalRelationOptionsCategories,
	product_tags: generalRelationOptionsTags,
};

export const relationOptions = {
	text: generalRelationOptions,
	button: generalRelationOptions,
	image: generalRelationOptions,
	container: null,
	row: generalRelationOptions,
	column: generalRelationOptions,
	group: generalRelationOptions,
	pane: generalRelationOptions,
	slide: generalRelationOptions,
	accordion: generalRelationOptions,
	slider: generalRelationOptions,
};

/**
 * Field constants
 */
const generalPostsPagesFields = [
	{
		label: __('Title', 'maxi-blocks'),
		value: 'title',
	},
	{
		label: __('Content', 'maxi-blocks'),
		value: 'content',
	},
	{
		label: __('Excerpt', 'maxi-blocks'),
		value: 'excerpt',
	},
	{ label: __('Date', 'maxi-blocks'), value: 'date' },
	{ label: __('Author', 'maxi-blocks'), value: 'author' },
	// TODO: add URL
];

const generalPostsFields = [
	...generalPostsPagesFields,
	{ label: __('Categories', 'maxi-blocks'), value: 'categories' },
	{ label: __('Tags', 'maxi-blocks'), value: 'tags' },
];

const generalSettingsFields = [
	{ label: __('Title', 'maxi-blocks'), value: 'title' },
	{ label: __('Description', 'maxi-blocks'), value: 'tagline' },
	{ label: __('Site URL', 'maxi-blocks'), value: 'url' },
	{ label: __('Admin email', 'maxi-blocks'), value: 'email' },
	{ label: __('Language', 'maxi-blocks'), value: 'language' },
];

const generalMediaFields = [
	{ label: __('Title', 'maxi-blocks'), value: 'title' },
	{ label: __('Caption', 'maxi-blocks'), value: 'caption' },
	{ label: __('Description', 'maxi-blocks'), value: 'description' },
	{ label: __('Alt text', 'maxi-blocks'), value: 'alt_text' },
	{ label: __('Link', 'maxi-blocks'), value: 'link' },
	{ label: __('URL', 'maxi-blocks'), value: 'source_url' },
	{ label: __('Mime type', 'maxi-blocks'), value: 'mime_type' },
	{ label: __('Date', 'maxi-blocks'), value: 'date' },
	{ label: __('Author', 'maxi-blocks'), value: 'author' },
];

const generalUsersFields = [
	{ label: __('Name', 'maxi-blocks'), value: 'name' },
	{ label: __('Description', 'maxi-blocks'), value: 'description' },
	{ label: __('Email', 'maxi-blocks'), value: 'email' },
	{ label: __('Link', 'maxi-blocks'), value: 'link' },
	{ label: __('Website', 'maxi-blocks'), value: 'url' },
];

const generalCategoryFields = [
	{ label: __('Name', 'maxi-blocks'), value: 'name' },
	{ label: __('Description', 'maxi-blocks'), value: 'description' },
	{ label: __('Slug', 'maxi-blocks'), value: 'slug' },
	{ label: __('Parent', 'maxi-blocks'), value: 'parent' },
	{ label: __('Count', 'maxi-blocks'), value: 'count' },
	{ label: __('Link', 'maxi-blocks'), value: 'link' },
];

const generalTagFields = generalCategoryFields.filter(
	option => option.value !== 'parent'
);

const buttonPostsPagesFields = [
	...generalPostsPagesFields.filter(option =>
		['title', 'author'].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const buttonSettingsFields = [
	...generalSettingsFields.filter(option =>
		['title', 'tagline', 'email'].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const buttonMediaFields = [
	...generalMediaFields.filter(option =>
		['title', 'tagline', 'email'].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const buttonAuthorFields = [
	...generalUsersFields.filter(option =>
		['title', 'tagline', 'email'].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const buttonCategoryFields = [
	...generalCategoryFields.filter(option =>
		['title', 'tagline', 'email'].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const buttonTagFields = [
	...generalTagFields.filter(option =>
		['title', 'tagline', 'email'].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const mediaPostsPagesFields = [
	{ label: __('Featured media', 'maxi-blocks'), value: 'featured_media' },
];

const mediaSettingsFields = [
	{ label: __('Logo', 'maxi-blocks'), value: 'site_logo' },
];

const mediaMediaFields = [{ label: __('Image', 'maxi-blocks'), value: 'id' }];

const mediaAuthorFields = [
	{ label: __('Avatar', 'maxi-blocks'), value: 'avatar' },
];

const textACFFieldTypes = [
	'text',
	'textarea',
	'number',
	'email',
	'url',
	'password',
	'range',
	'date_picker',
	'date_time_picker',
	'time_picker',
	'select',
	'radio',
	'checkbox',
	'button_group',
];

const mediaACFFieldTypes = ['image'];

const buttonACFFieldTypes = textACFFieldTypes;

const generalProductFields = [
	{ label: __('Name', 'maxi-blocks'), value: 'name' },
	{ label: __('Description', 'maxi-blocks'), value: 'description' },
	{
		label: __('Short description', 'maxi-blocks'),
		value: 'short_description',
	},
	{ label: __('Slug', 'maxi-blocks'), value: 'slug' },
	{ label: __('SKU', 'maxi-blocks'), value: 'sku' },
	{ label: __('Review count', 'maxi-blocks'), value: 'review_count' },
	{ label: __('Average rating', 'maxi-blocks'), value: 'average_rating' },
	{ label: __('Price', 'maxi-blocks'), value: 'price' },
	{ label: __('Regular price', 'maxi-blocks'), value: 'regular_price' },
	{ label: __('Sale price', 'maxi-blocks'), value: 'sale_price' },
	{ label: __('Price range', 'maxi-blocks'), value: 'price_range' },
	{ label: __('Categories', 'maxi-blocks'), value: 'categories' },
	{ label: __('Tags', 'maxi-blocks'), value: 'tags' },
];

const buttonProductFields = [
	...generalProductFields.filter(
		option =>
			![
				'short_description',
				'description',
				'categories',
				'tags',
			].includes(option.value)
	),
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

const imageProductFields = [
	{ label: __('Featured image', 'maxi-blocks'), value: 'featured_media' },
	{ label: __('Gallery image', 'maxi-blocks'), value: 'gallery' },
];

const generalCartFields = [
	{ label: __('Total price', 'maxi-blocks'), value: 'total_price' },
	{ label: __('Total tax', 'maxi-blocks'), value: 'total_tax' },
	{ label: __('Total shipping', 'maxi-blocks'), value: 'total_shipping' },
	{
		label: __('Total shipping tax', 'maxi-blocks'),
		value: 'total_shipping_tax',
	},
	{ label: __('Total discount', 'maxi-blocks'), value: 'total_discount' },
	{ label: __('Total items', 'maxi-blocks'), value: 'total_items' },
	{
		label: __('Total items tax', 'maxi-blocks'),
		value: 'total_items_tax',
	},
	{ label: __('Total fees', 'maxi-blocks'), value: 'total_fees' },
	{ label: __('Total fees tax', 'maxi-blocks'), value: 'total_fees_tax' },
];

const buttonCartFields = [
	...generalCartFields,
	{ label: __('Static text', 'maxi-blocks'), value: 'static_text' },
];

export const fieldOptions = {
	text: {
		posts: generalPostsFields,
		pages: generalPostsPagesFields,
		settings: generalSettingsFields,
		media: generalMediaFields,
		users: generalUsersFields,
		categories: generalCategoryFields,
		tags: generalTagFields,
		products: generalProductFields,
		cart: generalCartFields,
		product_categories: generalCategoryFields,
		product_tags: generalTagFields,
	},
	button: {
		posts: buttonPostsPagesFields,
		pages: buttonPostsPagesFields,
		settings: buttonSettingsFields,
		media: buttonMediaFields,
		users: buttonAuthorFields,
		categories: buttonCategoryFields,
		tags: buttonTagFields,
		products: buttonProductFields,
		cart: buttonCartFields,
		product_categories: buttonCategoryFields,
		product_tags: buttonTagFields,
	},
	image: {
		posts: mediaPostsPagesFields,
		pages: mediaPostsPagesFields,
		settings: mediaSettingsFields,
		media: mediaMediaFields,
		users: mediaAuthorFields,
		products: imageProductFields,
	},
};

export const acfFieldTypes = {
	text: textACFFieldTypes,
	button: buttonACFFieldTypes,
	image: mediaACFFieldTypes,
};

export const mediaFieldOptions = Object.values(fieldOptions.image).map(
	type => type.map(option => option.value)[0]
);

/**
 * Link constants
 */
export const multipleLinksTypes = ['products'];

export const linkOptions = {
	products: [
		{ label: __('Product', 'maxi-blocks'), value: 'product' },
		{ label: __('Add to cart', 'maxi-blocks'), value: 'add_to_cart' },
	],
};

/**
 * Option constants
 */
// Random get-by types
export const postsRandomOptions = [
	'author',
	'date',
	'id',
	'modified',
	'parent',
	'slug',
	'include_slugs',
	'title',
];

export const pagesRandomOptions = [
	'author',
	'date',
	'id',
	'modified',
	'parent',
	'slug',
	'include_slugs',
	'title',
];

export const mediaRandomOptions = [
	'author',
	'date',
	'id',
	'modified',
	'parent',
	'slug',
	'include_slugs',
	'title',
];

export const usersRandomOptions = [
	'id',
	'include',
	'name',
	'registered_date',
	'slug',
	'include_slugs',
	'email',
	'url',
];

export const categoriesRandomOptions = [
	'id',
	'include',
	'name',
	'slug',
	'include_slugs',
	'term_group',
	'description',
	'count',
];

export const tagsRandomOptions = [
	'id',
	'include',
	'name',
	'slug',
	'include_slugs',
	'term_group',
	'description',
	'count',
];

export const randomOptions = {
	posts: postsRandomOptions,
	pages: pagesRandomOptions,
	settings: [],
	media: mediaRandomOptions,
	users: usersRandomOptions,
	categories: categoriesRandomOptions,
	tags: tagsRandomOptions,
};

/**
 * Other constants
 */
export const idOptionByField = {
	posts: 'title',
	pages: 'title',
	media: 'title',
	products: 'title',
	tags: 'name',
	users: 'name',
	author: 'name',
	categories: 'name',
	product_categories: 'name',
	product_tags: 'name',
};

// Fields that use id field
export const idFields = [
	'posts',
	'pages',
	'media',
	'users',
	'categories',
	'tags',
	'authors',
	'products',
	'product_categories',
	'product_tags',
];

// Fields that have rendered and raw content
export const renderedFields = [
	'title',
	'content',
	'excerpt',
	'caption',
	'description',
];

// Types that accept relations
export const relationTypes = [
	'posts',
	'pages',
	'media',
	'categories',
	'tags',
	'users', // TODO: Add support for users
	'products',
	'product_categories',
	'product_tags',
];

// Types that can have relation "current".
export const currentEntityTypes = ['posts', 'pages'];

// Fields that can lead to different locations from post
export const linkFields = ['categories', 'tags', 'author'];

export const linkFieldsLabels = {
	categories: __('Use categories links', 'maxi-blocks'),
	tags: __('Use tags links', 'maxi-blocks'),
	author: __('Use author link', 'maxi-blocks'),
};

export const descriptionOfErrors = {
	next: __(
		'Sorry, there is no next post, please choose something else.',
		'maxi-blocks'
	),
	previous: __(
		'Sorry, there is no previous post, please choose something else.',
		'maxi-blocks'
	),
	object: __('Value is not an object.', 'maxi-blocks'),
	author: __(
		'Sorry, this author has no posts yet, please choose something else.',
		'maxi-blocks'
	),
	media: __(
		'Sorry, you do not have any images yet, please choose something else.',
		'maxi-blocks'
	),
	tags: __(
		'Sorry, you do not have any tags yet, please choose something else.',
		'maxi-blocks'
	),
};

export const limitTypes = [
	'posts',
	'pages',
	'tags',
	'categories',
	'products',
	'product_categories',
	'product_tags',
];

export const limitFields = [
	'excerpt',
	'content',
	'description',
	'short_description',
];

export const limitOptions = {
	disableReset: false,
	steps: 1,
	withInputField: false,
	min: 0,
	max: 9999,
};

export const orderByRelations = ['by-category', 'by-author', 'by-tag'];

export const orderRelations = ['by-date', 'alphabetical', ...orderByRelations];

export const orderByOptions = [
	{ label: __('By date', 'maxi-blocks'), value: 'by-date' },
	{ label: __('Alphabetical', 'maxi-blocks'), value: 'alphabetical' },
];

export const orderTypes = ['posts', 'pages', 'media', 'users', 'products'];

export const orderOptions = {
	'by-date': [
		{ label: __('New/old', 'maxi-blocks'), value: 'desc' },
		{ label: __('Old/new', 'maxi-blocks'), value: 'asc' },
	],
	alphabetical: [
		{ label: __('A/Z', 'maxi-blocks'), value: 'asc' },
		{ label: __('Z/A', 'maxi-blocks'), value: 'desc' },
	],
};

export const kindDictionary = {
	posts: 'postType',
	pages: 'postType',
	media: 'postType',
	settings: 'root',
	categories: 'taxonomy',
	tags: 'taxonomy',
	products: 'postType',
	product_categories: 'taxonomy',
	product_tags: 'taxonomy',
};
export const nameDictionary = {
	posts: 'post',
	pages: 'page',
	media: 'attachment',
	settings: '__unstableBase',
	categories: 'category',
	tags: 'post_tag',
	products: 'product',
	product_categories: 'product_cat',
	product_tags: 'product_tag',
};

export const attributeDefaults = {
	status: false,
	type: 'posts',
	relation: 'by-id',
	'order-by': 'by-date',
	order: attributes => {
		const dictionary = {
			'by-date': 'desc',
			alphabetical: 'asc',
		};

		const relation = attributes?.relation ?? attributes?.['cl-relation'];
		if (orderByRelations.includes(relation)) {
			return dictionary[attributes?.orderBy];
		}

		return dictionary[relation];
	},
	accumulator: 0,
};

let haveLoadedIntegrationsOptions = false;

export const getHaveLoadedIntegrationsOptions = () =>
	haveLoadedIntegrationsOptions;

const loadIntegrationsOptions = () => {
	apiFetch({
		path: '/maxi-blocks/v1.0/get-active-integration-plugins',
		method: 'GET',
	})
		.then(response => {
			if (response) {
				if (response.includes('acf')) {
					sourceOptions.push({
						label: __('ACF', 'maxi-blocks'),
						value: 'acf',
					});
				}

				if (response.includes('woocommerce')) {
					generalTypeOptions.push(...WCTypeOptions);
					imageTypeOptions.push(
						...WCTypeOptions.filter(
							option =>
								![
									'cart',
									'product_tags',
									'product_categories',
								].includes(option.value)
						)
					);
				}
			}

			haveLoadedIntegrationsOptions = true;
		})
		.catch(error => {
			console.error('Error loading integration options:', error);
		});
};

loadIntegrationsOptions();
