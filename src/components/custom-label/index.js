/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import TextControl from '../text-control';
import TextInput from '../text-input';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Component
 */
const CustomLabel = props => {
	const { className, customLabel, onChange } = props;

	const classes = classnames('maxi-custom-label', className);

	return (
		<div className={classes}>
			<TextInput
				label={__('Block name', 'maxi-blocks')}
				placeholder={__('Give a name…')}
				value={customLabel}
				onChange={value => onChange(value)}
			/>
			{/* <TextControl
				label={__('Block name', 'maxi-blocks')}
				placeholder={__('Give a name…')}
				value={customLabel}
				onChange={value => onChange(value)}
			/> */}
		</div>
	);
};

export default CustomLabel;
