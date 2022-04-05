/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ToolbarPopover from '../toolbar-popover';
import Icon from '../../../icon';
import AdvancedNumberControl from '../../../advanced-number-control';
import {
	getDefaultAttribute,
	getLastBreakpointAttribute,
} from '../../../../extensions/styles';
import { DefaultDividersControl } from '../../../divider-control';

/**
 * Styles & Icons
 */
import './editor.scss';
import { toolbarBorder, borderWidth } from '../../../../icons';

/**
 * Divider
 */

const Divider = props => {
	const { blockName, onChange, breakpoint } = props;

	if (blockName !== 'maxi-blocks/divider-maxi') return null;

	const minMaxSettings = {
		px: {
			min: 0,
			max: 999,
		},
		em: {
			min: 0,
			max: 999,
		},
		vw: {
			min: 0,
			max: 100,
		},
		'%': {
			min: 0,
			max: 100,
		},
	};

	const lineOrientation = getLastBreakpointAttribute(
		'line-orientation',
		breakpoint,
		props
	);

	const dividerBorderStyle = getLastBreakpointAttribute(
		'divider-border-style',
		breakpoint,
		props
	);

	return (
		<ToolbarPopover
			className='toolbar-item__divider-line'
			tooltip={__('Divider style', 'maxi-blocks')}
			icon={toolbarBorder}
			advancedOptions='line settings'
		>
			<div className='toolbar-item__divider-line__popover'>
				<DefaultDividersControl
					lineOrientation={lineOrientation}
					onChange={onChange}
					breakpoint={breakpoint}
					dividerBorderStyle={getLastBreakpointAttribute(
						'divider-border-style',
						breakpoint,
						props
					)}
				/>
				{lineOrientation === 'horizontal' && (
					<>
						<div className='divider-border__weight-wrap'>
							<div
								className={
									dividerBorderStyle === 'none' &&
									'divider-border__weight-disable'
								}
							>
								<Icon icon={borderWidth} />
								<AdvancedNumberControl
									value={getLastBreakpointAttribute(
										'divider-border-top-width',
										breakpoint,
										props
									)}
									onChangeValue={val =>
										onChange({
											[`divider-border-top-width-${breakpoint}`]:
												val,
										})
									}
									onReset={() =>
										onChange({
											[`divider-border-top-width-${breakpoint}`]:
												getDefaultAttribute(
													`divider-border-top-width-${breakpoint}`
												),
											[`divider-border-top-unit-${breakpoint}`]:
												getDefaultAttribute(
													`divider-border-top-unit-${breakpoint}`
												),
										})
									}
									minMaxSettings={minMaxSettings}
								/>
							</div>
						</div>
						<AdvancedNumberControl
							className={
								dividerBorderStyle === 'none' &&
								'divider-border__size-disable'
							}
							label={__('Line size', 'maxi-blocks')}
							value={getLastBreakpointAttribute(
								'divider-width',
								breakpoint,
								props
							)}
							onChangeValue={val =>
								onChange({
									[`divider-width-${breakpoint}`]: val,
								})
							}
							onReset={() =>
								onChange({
									[`divider-width-${breakpoint}`]:
										getDefaultAttribute(
											`divider-width-${breakpoint}`
										),
									[`divider-width-unit-${breakpoint}`]:
										getDefaultAttribute(
											`divider-width-unit-${breakpoint}`
										),
								})
							}
							minMaxSettings={minMaxSettings}
						/>
					</>
				)}
				{lineOrientation === 'vertical' && (
					<>
						<div className='divider-border__weight-wrap'>
							<div
								className={
									dividerBorderStyle === 'none' &&
									'divider-border__weight-disable'
								}
							>
								<Icon icon={borderWidth} />
								<AdvancedNumberControl
									value={getLastBreakpointAttribute(
										'divider-border-right-width',
										breakpoint,
										props
									)}
									onChangeValue={val => {
										onChange({
											[`divider-border-right-width-${breakpoint}`]:
												val !== undefined && val !== ''
													? val
													: '',
										});
									}}
									min={0}
									max={100}
									onReset={() =>
										onChange({
											[`divider-border-right-width-${breakpoint}`]:
												getDefaultAttribute(
													`divider-border-right-width-${breakpoint}`
												),
										})
									}
									initialPosition={getDefaultAttribute(
										`divider-border-right-width-${breakpoint}`
									)}
								/>
							</div>
						</div>
						<AdvancedNumberControl
							className={
								dividerBorderStyle === 'none' &&
								'divider-border__size-disable'
							}
							label={__('Size', 'maxi-blocks')}
							value={getLastBreakpointAttribute(
								'divider-height',
								breakpoint,
								props
							)}
							onChangeValue={val => {
								onChange({
									[`divider-height-${breakpoint}`]:
										val !== undefined && val !== ''
											? val
											: '',
								});
							}}
							min={0}
							max={100}
							onReset={() =>
								onChange({
									[`divider-height-${breakpoint}`]:
										getDefaultAttribute(
											`divider-height-${breakpoint}`
										),
								})
							}
							initialPosition={getDefaultAttribute(
								`divider-height-${breakpoint}`
							)}
						/>
					</>
				)}
			</div>
		</ToolbarPopover>
	);
};

export default Divider;
