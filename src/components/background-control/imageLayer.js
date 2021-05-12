/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import SelectControl from '../select-control';
import MediaUploaderControl from '../media-uploader-control';
import ClipPath from '../clip-path-control';
import OpacityControl from '../opacity-control';
import ImageCropControl from '../image-crop-control';
import SizeControl from '../size-control';
import { getDefaultAttribute, getAttributeKey } from '../../extensions/styles';

/**
 * External dependencies
 */
import { cloneDeep } from 'lodash';

/**
 * Component
 */
const ImageLayer = props => {
	const { onChange, disableClipPath, isHover, prefix } = props;
	const imageOptions = cloneDeep(props.imageOptions);

	return (
		<>
			<MediaUploaderControl
				mediaID={
					imageOptions[
						getAttributeKey(
							'background-image-mediaID',
							isHover,
							prefix
						)
					]
				}
				onSelectImage={imageData =>
					onChange({
						[getAttributeKey(
							'background-image-mediaID',
							isHover,
							prefix
						)]: imageData.id,
						[getAttributeKey(
							'background-image-mediaURL',
							isHover,
							prefix
						)]: imageData.url,
						[getAttributeKey(
							'background-image-width',
							isHover,
							prefix
						)]: imageData.width,
						[getAttributeKey(
							'background-image-height',
							isHover,
							prefix
						)]: imageData.height,
					})
				}
				onRemoveImage={() =>
					onChange({
						[getAttributeKey(
							'background-image-mediaID',
							isHover,
							prefix
						)]: '',
						[getAttributeKey(
							'background-image-mediaURL',
							isHover,
							prefix
						)]: '',
						[getAttributeKey(
							'background-image-width',
							isHover,
							prefix
						)]: '',
						[getAttributeKey(
							'background-image-height',
							isHover,
							prefix
						)]: '',
					})
				}
				placeholder={__('Set image', 'maxi-blocks')}
				// alternativeImage={{
				// 	source_url: props['background-image-mediaURL'],
				// 	width: props['background-image-width'],
				// 	height: props['background-image-height'],
				// }}
				removeButton={__('Remove', 'maxi-blocks')}
			/>
			<OpacityControl
				label={__('Background Opacity', 'maxi-blocks')}
				fullWidthMode
				opacity={
					imageOptions[
						getAttributeKey(
							'background-image-opacity',
							isHover,
							prefix
						)
					]
				}
				defaultOpacity={getDefaultAttribute(
					getAttributeKey('background-image-opacity', isHover, prefix)
				)}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-opacity',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			<SelectControl
				label={__('Background size', 'maxi-blocks')}
				value={
					imageOptions[
						getAttributeKey(
							'background-image-size',
							isHover,
							prefix
						)
					]
				}
				options={[
					{
						label: __('Auto', 'maxi-blocks'),
						value: 'auto',
					},
					{
						label: __('Cover', 'maxi-blocks'),
						value: 'cover',
					},
					{
						label: __('Contain', 'maxi-blocks'),
						value: 'contain',
					},
					{
						label: __('Custom', 'maxi-blocks'),
						value: 'custom',
					},
				]}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-size',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			{imageOptions[
				getAttributeKey('background-image-size', isHover, prefix)
			] === 'custom' && (
				<ImageCropControl
					mediaID={
						imageOptions[
							getAttributeKey(
								'background-image-mediaID',
								isHover,
								prefix
							)
						]
					}
					cropOptions={
						imageOptions[
							getAttributeKey(
								'background-image-cropOptions',
								isHover,
								prefix
							)
						]
					}
					onChange={cropOptions =>
						onChange({
							[getAttributeKey(
								'background-image-cropOptions',
								isHover,
								prefix
							)]: cropOptions,
						})
					}
				/>
			)}
			<SelectControl
				label={__('Background repeat', 'maxi-blocks')}
				value={
					imageOptions[
						getAttributeKey(
							'background-image-repeat',
							isHover,
							prefix
						)
					]
				}
				options={[
					{
						label: __('Repeat', 'maxi-blocks'),
						value: 'repeat',
					},
					{
						label: __('No repeat', 'maxi-blocks'),
						value: 'no-repeat',
					},
					{
						label: __('Repeat X', 'maxi-blocks'),
						value: 'repeat-x',
					},
					{
						label: __('Repeat Y', 'maxi-blocks'),
						value: 'repeat-y',
					},
					{
						label: __('Space', 'maxi-blocks'),
						value: 'space',
					},
					{
						label: __('Round', 'maxi-blocks'),
						value: 'round',
					},
				]}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-repeat',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			<SelectControl
				label={__('Background position', 'maxi-blocks')}
				value={
					imageOptions[
						getAttributeKey(
							'background-image-position',
							isHover,
							prefix
						)
					]
				}
				options={[
					{
						label: __('Left top', 'maxi-blocks'),
						value: 'left top',
					},
					{
						label: __('Left center', 'maxi-blocks'),
						value: 'left center',
					},
					{
						label: __('Left bottom', 'maxi-blocks'),
						value: 'left bottom',
					},
					{
						label: __('Right top', 'maxi-blocks'),
						value: 'right top',
					},
					{
						label: __('Right center', 'maxi-blocks'),
						value: 'right center',
					},
					{
						label: __('Right bottom', 'maxi-blocks'),
						value: 'right bottom',
					},
					{
						label: __('Center top', 'maxi-blocks'),
						value: 'center top',
					},
					{
						label: __('Center center', 'maxi-blocks'),
						value: 'center center',
					},
					{
						label: __('Center bottom', 'maxi-blocks'),
						value: 'center bottom',
					},
					{
						label: __('Custom', 'maxi-blocks'),
						value: 'custom',
					},
				]}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-position',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			{imageOptions[
				getAttributeKey('background-image-position', isHover, prefix)
			] === 'custom' && (
				<>
					<SizeControl
						label={__('Y-axis', 'maxi-blocks')}
						unit={
							imageOptions[
								getAttributeKey(
									'background-image-position-width-unit',
									isHover,
									prefix
								)
							]
						}
						onChangeUnit={val =>
							onChange({
								[getAttributeKey(
									'background-image-position-width-unit',
									isHover,
									prefix
								)]: val,
							})
						}
						value={
							imageOptions[
								getAttributeKey(
									'background-image-position-width',
									isHover,
									prefix
								)
							]
						}
						onChangeValue={val =>
							onChange({
								[getAttributeKey(
									'background-image-position-width',
									isHover,
									prefix
								)]: val,
							})
						}
						onReset={() =>
							onChange({
								[getAttributeKey(
									'background-image-position-width',
									isHover,
									prefix
								)]: getDefaultAttribute(
									getAttributeKey(
										'background-image-position-width',
										isHover,
										prefix
									)
								),
								[getAttributeKey(
									'background-image-position-width-unit',
									isHover,
									prefix
								)]: getDefaultAttribute(
									getAttributeKey(
										'background-image-position-width-unit',
										isHover,
										prefix
									)
								),
							})
						}
					/>
					<SizeControl
						label={__('X-axis', 'maxi-blocks')}
						unit={
							imageOptions[
								getAttributeKey(
									'background-image-position-height-unit',
									isHover,
									prefix
								)
							]
						}
						onChangeUnit={val =>
							onChange({
								[getAttributeKey(
									'background-image-position-height-unit',
									isHover,
									prefix
								)]: val,
							})
						}
						value={
							imageOptions[
								getAttributeKey(
									'background-image-position-height',
									isHover,
									prefix
								)
							]
						}
						onChangeValue={val =>
							onChange({
								[getAttributeKey(
									'background-image-position-height',
									isHover,
									prefix
								)]: val,
							})
						}
						onReset={() =>
							onChange({
								[getAttributeKey(
									'background-image-position-height',
									isHover,
									prefix
								)]: getDefaultAttribute(
									getAttributeKey(
										'background-image-position-height',
										isHover,
										prefix
									)
								),
								[getAttributeKey(
									'background-image-position-height-unit',
									isHover,
									prefix
								)]: getDefaultAttribute(
									getAttributeKey(
										'background-image-position-height-unit',
										isHover,
										prefix
									)
								),
							})
						}
					/>
				</>
			)}
			<SelectControl
				label={__('Background origin', 'maxi-blocks')}
				value={
					imageOptions[
						getAttributeKey(
							'background-image-origin',
							isHover,
							prefix
						)
					]
				}
				options={[
					{
						label: __('Padding', 'maxi-blocks'),
						value: 'padding-box',
					},
					{
						label: __('Border', 'maxi-blocks'),
						value: 'border-box',
					},
					{
						label: __('Content', 'maxi-blocks'),
						value: 'content-box',
					},
				]}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-origin',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			<SelectControl
				label={__('Background clip', 'maxi-blocks')}
				value={
					imageOptions[
						getAttributeKey(
							'background-image-clip-path',
							isHover,
							prefix
						)
					]
				}
				options={[
					{
						label: __('Border', 'maxi-blocks'),
						value: 'border-box',
					},
					{
						label: __('Padding', 'maxi-blocks'),
						value: 'padding-box',
					},
					{
						label: __('Content', 'maxi-blocks'),
						value: 'content-box',
					},
				]}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-clip-path',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			<SelectControl
				label={__('Background attachment', 'maxi-blocks')}
				value={
					imageOptions[
						getAttributeKey(
							'background-image-attachment',
							isHover,
							prefix
						)
					]
				}
				options={[
					{
						label: __('Scroll', 'maxi-blocks'),
						value: 'scroll',
					},
					{
						label: __('Fixed', 'maxi-blocks'),
						value: 'fixed',
					},
					{
						label: __('Local', 'maxi-blocks'),
						value: 'local',
					},
				]}
				onChange={val =>
					onChange({
						[getAttributeKey(
							'background-image-attachment',
							isHover,
							prefix
						)]: val,
					})
				}
			/>
			<hr />
			{!disableClipPath && (
				<ClipPath
					clipPath={
						imageOptions[
							getAttributeKey(
								'background-image-clip-path',
								isHover,
								prefix
							)
						]
					}
					onChange={val =>
						onChange({
							[getAttributeKey(
								'background-image-clip-path',
								isHover,
								prefix
							)]: val,
						})
					}
				/>
			)}
		</>
	);
};

export default ImageLayer;
