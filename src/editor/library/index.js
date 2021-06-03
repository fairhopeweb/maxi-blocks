/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './store';
import LibraryToolbar from './toolbar';
import LibraryContainer from './container';
import LibrarySpinner from './spinner';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty } from 'lodash';

/**
 * Styles
 */
import './editor.scss';

/**
 * Component
 *
 * @param {string} cloudType Type of the data to get from the Cloud, values: patterns, svg, sc
 */
const CloudLibrary = props => {
	const { onClose, className, cloudType } = props;

	const [type, setType] = useState(cloudType);

	const { cloudData } = useSelect(select => {
		const { receiveMaxiCloudLibrary } = select('maxiBlocks/cloudLibrary');
		const cloudData = receiveMaxiCloudLibrary(type);

		return {
			cloudData,
		};
	});

	const classes = classnames('maxi-library-modal', className);

	return (
		<Modal
			title={__('Maxi Cloud Library', 'maxi-blocks')}
			className={classes}
			shouldCloseOnEsc
			shouldCloseOnClickOutside={false}
			onRequestClose={onClose}
		>
			<>
				<LibraryToolbar type={type} onChange={type => setType(type)} />
				<LibraryContainer type={type} onRequestClose={onClose} />
			</>
		</Modal>
	);
};

export default CloudLibrary;
