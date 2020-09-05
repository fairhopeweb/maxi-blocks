/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { useSelect, useDispatch } = wp.data;
const { Button } = wp.components;

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Styles
 */
import './editor.scss';
import {
	xsMode,
	xlMode,
	xllMode,
	largeMode,
	mediumMode,
	smallMode,
} from '../../icons';

/**
 * Components
 */
const ResponsiveSelector = props => {
	const { className } = props;

	const { deviceType, breakpoints } = useSelect(select => {
		const { __experimentalGetPreviewDeviceType } = select('core/edit-post');
		const { receiveMaxiBreakpoints } = select('maxiBlocks');
		return {
			deviceType: __experimentalGetPreviewDeviceType(),
			breakpoints: receiveMaxiBreakpoints(),
		};
	});

	const {
		__experimentalSetPreviewDeviceType: setPreviewDevice,
	} = useDispatch('core/edit-post');

	const classes = classnames('maxi-responsive-selector', className);

	const setScreenSize = size => {
		const editorWrapper = document.querySelector(
			'.edit-post-visual-editor.editor-styles-wrapper'
		);
		const winHeight = window.outerWidth;

		editorWrapper.setAttribute('maxi-blocks-responsive', size);

		if (size === 'general') {
			editorWrapper.style.width = '';
			editorWrapper.style.margin = '';
		} else {
			if (size !== 'xxl')
				editorWrapper.style.width = `${breakpoints[size]}px`;
			else editorWrapper.style.width = '2000px'; // !!!

			if (winHeight > breakpoints[size])
				editorWrapper.style.margin = '36px auto';
			else editorWrapper.style.margin = '';
		}
	};

	const onChangeSize = size => {
		if (size === 'general') setPreviewDevice('Desktop');
		else setPreviewDevice(size);

		setScreenSize(size);
	};

	return (
		<div className={classes}>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('general')}
				aria-pressed={deviceType === 'Desktop'}
			>
				{__('Base', 'maxi-blocks')}
			</Button>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('xxl')}
				aria-pressed={deviceType === 'xxl'}
			>
				{xllMode}
			</Button>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('xl')}
				aria-pressed={deviceType === 'xl'}
			>
				{xlMode}
			</Button>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('l')}
				aria-pressed={deviceType === 'l'}
			>
				{largeMode}
			</Button>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('m')}
				aria-pressed={deviceType === 'm'}
			>
				{mediumMode}
			</Button>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('s')}
				aria-pressed={deviceType === 's'}
			>
				{smallMode}
			</Button>
			<Button
				className='maxi-responsive-selector__button'
				onClick={() => onChangeSize('xs')}
				aria-pressed={deviceType === 'xs'}
			>
				{xsMode}
			</Button>
		</div>
	);
};

export default ResponsiveSelector;
