/**
 * WordPress dependencies
 */
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Button } from '../../components';
import MaxiBlock from '../../components/maxi-block';
import { getMaxiBlockAttributes } from '../../extensions/maxi-block';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isNil, isEmpty } from 'lodash';

/**
 * Save
 */
const save = props => {
	const { attributes } = props;
	const { fullWidth, linkSettings, buttonContent } = attributes;

	const name = 'maxi-blocks/button-maxi';

	const linkOpt = !isNil(linkSettings) && linkSettings;

	const linkProps = {
		...linkOpt,
		href: linkOpt.url || '',
		target: linkOpt.opensInNewTab ? '_blank' : '_self',
	};

	const buttonClasses = classnames(
		'maxi-button-block__button',
		attributes['icon-content'] &&
			attributes['icon-position'] === 'left' &&
			'maxi-button-block__button--icon-left',
		attributes['icon-content'] &&
			attributes['icon-position'] === 'right' &&
			'maxi-button-block__button--icon-right'
	);

	return (
		<MaxiBlock
			{...getMaxiBlockAttributes({ ...props, name })}
			isSave
			disableBackground
		>
			<Button
				className={buttonClasses}
				data-align={fullWidth}
				{...(!isEmpty(linkProps.href) && linkProps)}
			>
				{!attributes['icon-only'] && (
					<span className='maxi-button-block__content'>
						{buttonContent}
					</span>
				)}
				{attributes['icon-content'] && (
					<div className='maxi-button-block__icon'>
						<div>
							<RawHTML>{attributes['icon-content']}</RawHTML>
						</div>
					</div>
				)}
			</Button>
		</MaxiBlock>
	);
};

export default save;
