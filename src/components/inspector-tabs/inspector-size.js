/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import FullSizeControl from '../full-size-control';
import {
	getGroupAttributes,
	getLastBreakpointAttribute,
} from '../../extensions/styles';

/**
 * Component
 */
const size = ({
	props,
	prefix = '',
	block = false,
	hideHeight = false,
	hideWidth = false,
	hideMaxWidth = false,
	hideFullWidth = false,
	isImage = false,
}) => {
	const { attributes, deviceType, maxiSetAttributes, name } = props;
	const { isFirstOnHierarchy } = attributes;

	const fullWidth = getLastBreakpointAttribute({
		target: `${prefix}full-width`,
		breakpoint: deviceType,
		attributes,
	});

	const showFullWidth =
		(isFirstOnHierarchy || name === 'maxi-blocks/row-maxi') &&
		!hideFullWidth;
	const isBlockFullWidth = fullWidth === 'full';

	return {
		label: __('Height / Width', 'maxi-blocks'),
		content: (
			<FullSizeControl
				{...getGroupAttributes(attributes, 'size', false, prefix)}
				prefix={prefix}
				onChange={obj => maxiSetAttributes(obj)}
				breakpoint={deviceType}
				hideHeight={hideHeight}
				hideWidth={hideWidth || isBlockFullWidth}
				hideMaxWidth={hideMaxWidth || isBlockFullWidth}
				isBlockFullWidth={isBlockFullWidth}
				allowForceAspectRatio={block}
				showFullWidth={showFullWidth}
				block={block}
				isImage={isImage}
			/>
		),
		extraIndicators: [
			...(isFirstOnHierarchy ? 'blockFullWidth' : 'fullWidth'),
		],
	};
};

export default size;
