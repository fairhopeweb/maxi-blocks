/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	AdvancedNumberControl,
	SelectControl,
	ToggleSwitch,
} from '../../components';
import MaxiModal from '../../editor/library/modal';
import {
	getDefaultAttribute,
	getLastBreakpointAttribute,
} from '../../extensions/styles';
import {
	setSVGRatio,
	setSVGPosition,
	getSVGPosition,
	getSVGRatio,
} from '../../extensions/svg';

/**
 * ImageShape
 */
const ImageShape = props => {
	const {
		onChange,
		breakpoint,
		icon,
		prefix = '',
		disableModal = false,
		disableImagePosition = false,
		disableImageRatio = false,
	} = props;

	const {
		[`${prefix}image-shape-rotate-${breakpoint}`]: shapeRotate,
		[`${prefix}image-shape-flip-x-${breakpoint}`]: shapeFlipHorizontally,
		[`${prefix}image-shape-flip-y-${breakpoint}`]: shapeFlipVertically,
	} = props;
	const shapePosition = getSVGPosition(icon);
	const shapeRatio = getSVGRatio(icon);

	return (
		<>
			{!disableModal && breakpoint === 'general' && (
				<MaxiModal
					type='image-shape'
					onSelect={obj => {
						const { SVGElement } = obj;

						const newSVGElement = SVGElement.replace(
							/class="(.*?)"/,
							`class="${
								SVGElement.match(/class="(.*?)"/)[1]
							} maxi-image-block__image"`
						);

						onChange({ ...obj, SVGElement: newSVGElement });
					}}
					onRemove={obj => {
						onChange(obj);
					}}
					icon={icon}
				/>
			)}
			{icon && (
				<>
					{breakpoint === 'general' && (
						<>
							{!disableImageRatio && (
								<SelectControl
									label={__('Image ratio', 'maxi-blocks')}
									value={shapeRatio || ''}
									options={[
										{
											label: __('Fit', 'maxi-blocks'),
											value: 'meet',
										},
										{
											label: __('Fill', 'maxi-blocks'),
											value: 'slice',
										},
									]}
									onChange={val =>
										onChange({
											SVGElement: setSVGRatio(icon, val),
										})
									}
								/>
							)}
							{!disableImagePosition && (
								<SelectControl
									label={__('Image position', 'maxi-blocks')}
									value={shapePosition || 'xMidYMid'}
									options={[
										{
											label: __(
												'Center center',
												'maxi-blocks'
											),
											value: 'xMidYMid',
										},
										{
											label: __(
												'Left center',
												'maxi-blocks'
											),
											value: 'xMinYMid',
										},
										{
											label: __(
												'Right center',
												'maxi-blocks'
											),
											value: 'xMaxYMid',
										},
										{
											label: __(
												'Center top',
												'maxi-blocks'
											),
											value: 'xMidYMax',
										},
										{
											label: __(
												'Center bottom',
												'maxi-blocks'
											),
											value: 'xMidYMin',
										},
										{
											label: __(
												'Left bottom',
												'maxi-blocks'
											),
											value: 'xMinYMin',
										},
										{
											label: __(
												'Right bottom',
												'maxi-blocks'
											),
											value: 'xMaxYMin',
										},
										{
											label: __(
												'Left top',
												'maxi-blocks'
											),
											value: 'xMinYMax',
										},
										{
											label: __(
												'Right top',
												'maxi-blocks'
											),
											value: 'xMaxYMax',
										},
									]}
									onChange={val =>
										onChange({
											SVGElement: setSVGPosition(
												icon,
												val
											),
										})
									}
								/>
							)}
						</>
					)}
					<AdvancedNumberControl
						label={__('Scale shape', 'maxi-blocks')}
						value={getLastBreakpointAttribute({
							target: `${prefix}image-shape-scale`,
							attributes: props,
							breakpoint,
						})}
						min={0}
						max={500}
						step={1}
						initial={100}
						onChangeValue={val => {
							onChange({
								[`${prefix}image-shape-scale-${breakpoint}`]:
									val !== undefined && val !== '' ? val : '',
							});
						}}
						onReset={() =>
							onChange({
								[`${prefix}image-shape-scale-${breakpoint}`]:
									getDefaultAttribute('image-shape-scale'),
							})
						}
					/>
					<AdvancedNumberControl
						label={__('Rotate shape', 'maxi-blocks')}
						value={shapeRotate || null}
						min={0}
						max={360}
						step={1}
						initialPosition={0}
						placeholder='0deg'
						onChangeValue={val => {
							onChange({
								[`${prefix}image-shape-rotate-${breakpoint}`]:
									val !== undefined && val !== '' ? val : '',
							});
						}}
						onReset={() =>
							onChange({
								[`${prefix}image-shape-rotate-${breakpoint}`]:
									'',
							})
						}
					/>
					<ToggleSwitch
						label={__('Flip shape horizontally', 'maxi-blocks')}
						selected={shapeFlipHorizontally || 0}
						onChange={val => {
							onChange({
								[`${prefix}image-shape-flip-x-${breakpoint}`]:
									val,
							});
						}}
					/>
					<ToggleSwitch
						label={__('Flip shape vertically', 'maxi-blocks')}
						selected={shapeFlipVertically || 0}
						onChange={val => {
							onChange({
								[`${prefix}image-shape-flip-y-${breakpoint}`]:
									val,
							});
						}}
					/>
				</>
			)}
		</>
	);
};

export default ImageShape;
