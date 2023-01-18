/**
 * Internal dependencies.
 */
import MaxiModal from '../../editor/library/modal';
import { withMaxiProps } from '../../extensions/maxi-block';

/**
 * WordPress dependencies.
 */
import { Component, RawHTML } from '@wordpress/element';

/**
 * External dependencies
 */
import { isEmpty } from 'lodash';

class edit extends Component {
	render() {
		const { attributes, clientId, maxiSetAttributes } = this.props;
		const { content, openFirstTime } = attributes;

		/* Placeholder with layout modal */
		return [
			<div key={this.props.clientId}>
				{isEmpty(content) && (
					<div className='maxi-block-library__placeholder'>
						<MaxiModal
							clientId={clientId}
							type='patterns'
							openFirstTime={openFirstTime}
							onOpen={obj => maxiSetAttributes(obj)}
							onSelect={obj => maxiSetAttributes(obj)}
							onRemove={obj => maxiSetAttributes(obj)}
							{...this.props}
						/>
					</div>
				)}
				{!isEmpty(content) && <RawHTML>{content}</RawHTML>}
			</div>,
		];
	}
}

export default withMaxiProps(edit);
