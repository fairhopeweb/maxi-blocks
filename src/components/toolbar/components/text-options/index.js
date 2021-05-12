/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Button from '../../../button';
import { defaultTypography } from '../../../../extensions/text';
import BaseControl from '../../../base-control';
import FontFamilySelector from '../../../font-family-selector';
import ToolbarPopover from '../toolbar-popover';
import TextFormatStrikethrough from '../text-format-strikethrough';
import TextFormatUnderline from '../text-format-underline';
import TextFormatOverline from '../text-format-overline';
import TextFormatSubscript from '../text-format-subscript';
import TextFormatSuperscript from '../text-format-superscript';
import TextFormatCode from '../text-format-code';
import {
	setFormat,
	getCustomFormatValue,
	withFormatValue,
} from '../../../../extensions/text/formats';
import {
	getGroupAttributes,
	getDefaultAttribute,
} from '../../../../extensions/styles';

/**
 * External dependencies
 */
import { isEmpty, trim } from 'lodash';

/**
 * Styles and icons
 */
import './editor.scss';
import { toolbarType, reset } from '../../../../icons';

/**
 * TextOptions
 */
const TextOptions = withFormatValue(props => {
	const {
		blockName,
		onChange,
		breakpoint,
		isList,
		textLevel,
		formatValue,
	} = props;

	if (blockName !== 'maxi-blocks/text-maxi') return null;

	const typography = { ...getGroupAttributes(props, 'typography') };

	const getValue = prop =>
		getCustomFormatValue({
			typography,
			formatValue,
			prop,
			breakpoint,
		});

	const onChangeFormat = value => {
		const obj = setFormat({
			formatValue,
			isList,
			typography: { ...getGroupAttributes(props, 'typography') },
			value,
			breakpoint,
			textLevel,
		});

		onChange(obj);
	};

	return (
		<ToolbarPopover
			className='toolbar-item__text-options'
			tooltip={__('Typography', 'maxi-blocks')}
			icon={toolbarType}
			advancedOptions='typography'
		>
			<div className='toolbar-item__popover__font-options'>
				<div className='toolbar-item__popover__font-options__font'>
					<FontFamilySelector
						className='toolbar-item__popover__font-options__font__selector'
						defaultValue={getDefaultAttribute(
							`font-family-${breakpoint}`
						)}
						font={getValue('font-family')}
						onChange={font => {
							onChangeFormat({
								'font-family': font.value,
							});
						}}
						theme='dark'
					/>
				</div>
				<Fragment>
					<BaseControl
						label={__('Size', 'maxi-blocks')}
						className='toolbar-item__popover__font-options__number-control'
					>
						<input
							type='number'
							value={trim(getValue('font-size'))}
							onChange={e => {
								const newFontSize = isEmpty(e.target.value)
									? ''
									: +e.target.value;
								onChangeFormat({
									'font-size': newFontSize,
								});
							}}
						/>
						<Button
							className='components-maxi-control__reset-button'
							onClick={() => {
								onChangeFormat({
									'font-size':
										defaultTypography[textLevel][
											`font-size-${breakpoint}`
										],
								});
							}}
							isSmall
							aria-label={sprintf(
								/* translators: %s: a textual label  */
								__('Reset %s settings', 'maxi-blocks'),
								'size'
							)}
							type='reset'
						>
							{reset}
						</Button>
					</BaseControl>
					<BaseControl
						label={__('Line Height', 'maxi-blocks')}
						className='toolbar-item__popover__font-options__number-control'
					>
						<input
							type='number'
							value={trim(getValue('line-height'))}
							onChange={e => {
								const newFontSize = isEmpty(e.target.value)
									? ''
									: +e.target.value;

								onChangeFormat({
									'line-height': newFontSize,
								});
							}}
						/>
						<Button
							className='components-maxi-control__reset-button'
							onClick={() => {
								onChangeFormat({
									'line-height':
										defaultTypography[textLevel][
											`line-height-${breakpoint}`
										],
								});
							}}
							isSmall
							aria-label={sprintf(
								/* translators: %s: a textual label  */
								__('Reset %s settings', 'maxi-blocks'),
								'line height'
							)}
							type='reset'
						>
							{reset}
						</Button>
					</BaseControl>
					<BaseControl
						label={__('Letter Spacing', 'maxi-blocks')}
						className='toolbar-item__popover__font-options__number-control'
					>
						<input
							type='number'
							value={trim(getValue('letter-spacing'))}
							onChange={e => {
								const newFontSize = isEmpty(e.target.value)
									? ''
									: +e.target.value;

								onChangeFormat({
									'letter-spacing': newFontSize,
								});
							}}
						/>
						<Button
							className='components-maxi-control__reset-button'
							onClick={() => {
								onChangeFormat({
									'letter-spacing':
										defaultTypography[textLevel][
											`letter-spacing-${breakpoint}`
										],
								});
							}}
							isSmall
							aria-label={sprintf(
								/* translators: %s: a textual label  */
								__('Reset %s settings', 'maxi-blocks'),
								'letter spacing'
							)}
							type='reset'
						>
							{reset}
						</Button>
					</BaseControl>
					<div>
						<TextFormatOverline
							{...getGroupAttributes(props, 'typography')}
							formatValue={formatValue}
							onChange={obj => onChange(obj)}
							isList={isList}
							breakpoint={breakpoint}
							textLevel={textLevel}
						/>
						<TextFormatStrikethrough
							{...getGroupAttributes(props, 'typography')}
							formatValue={formatValue}
							onChange={obj => onChange(obj)}
							isList={isList}
							breakpoint={breakpoint}
							textLevel={textLevel}
						/>
						<TextFormatUnderline
							{...getGroupAttributes(props, 'typography')}
							formatValue={formatValue}
							onChange={obj => onChange(obj)}
							isList={isList}
							breakpoint={breakpoint}
							textLevel={textLevel}
						/>
						<TextFormatSubscript
							{...getGroupAttributes(props, 'typography')}
							formatValue={formatValue}
							onChange={obj => onChange(obj)}
							isList={isList}
							breakpoint={breakpoint}
							textLevel={textLevel}
						/>
						<TextFormatSuperscript
							{...getGroupAttributes(props, 'typography')}
							formatValue={formatValue}
							onChange={obj => onChange(obj)}
							isList={isList}
							breakpoint={breakpoint}
							textLevel={textLevel}
						/>
						<TextFormatCode
							onChange={content => onChange({ content })}
							isList={isList}
							formatValue={formatValue}
							textLevel={textLevel}
						/>
					</div>
				</Fragment>
			</div>
		</ToolbarPopover>
	);
});

export default TextOptions;
