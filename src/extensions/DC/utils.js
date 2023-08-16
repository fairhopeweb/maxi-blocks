/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	fieldOptions,
	relationOptions,
	orderByRelations,
	typeOptions,
} from './constants';

/**
 * External dependencies
 */
import moment from 'moment';
import 'moment-parseformat';
import { isEmpty, isNumber } from 'lodash';

export const parseText = value => {
	const parser = new DOMParser();
	const doc = parser.parseFromString(value, 'text/html');
	return doc.body.textContent;
};

export const cutTags = str => {
	const regex = /( |<([^>]+)>)/gi;
	const result = str.replace(regex, ' ');
	return result;
};

export const getSimpleText = str => {
	const result = str
		.replace(/<style.*?<\/style>/g, '')
		.replace(/<svg.*?<\/svg>/g, '');

	return cutTags(result);
};

export const limitString = (value, limit) => {
	if (limit === 0) return value;

	const str = cutTags(value).trim();

	if (str.length > limit && limit !== 0) return `${str.substr(0, limit)}…`;

	return str;
};

// In case content is empty, show this text
export const sanitizeDCContent = content =>
	!isEmpty(content) || isNumber(content)
		? __(content, 'maxi-blocks')
		: __('No content found', 'maxi-blocks');

export const validationsValues = (
	variableValue,
	field,
	relation,
	contentType,
	source = 'wp',
	isCL = false
) => {
	if (source === 'acf') return {};

	const prefix = isCL ? 'cl-' : 'dc-';

	const contentTypeSelector = source === 'wp' ? contentType : source;
	const fieldResult = fieldOptions?.[contentTypeSelector]?.[
		variableValue
	].map(x => x.value);
	const relationResult = relationOptions?.[contentTypeSelector]?.[
		variableValue
	].map(x => x.value);
	const isTypeValid = typeOptions[contentTypeSelector]
		.map(item => item.value)
		.includes(variableValue);

	return {
		...(!isCL &&
			fieldResult &&
			!fieldResult.includes(field) && {
				[`${prefix}field`]: fieldResult[0],
			}),
		...(relationResult &&
			!relationResult.includes(relation) && {
				[`${prefix}relation`]: relationResult[0],
			}),
		...(!isTypeValid && {
			[`${prefix}type`]: typeOptions[contentTypeSelector][0].value,
		}),
	};
};

export const getDCDateCustomFormat = date => moment.parseFormat(date);

export const getDCOrder = (relation, orderBy) => {
	const dictionary = {
		'by-date': 'date',
		alphabetical: 'title',
	};

	if (orderByRelations.includes(relation)) {
		return dictionary[orderBy];
	}

	return dictionary[relation];
};
