/**
 * External dependencies
 */
import { merge } from 'lodash';

/**
 * Internal dependencies
 */
import { getGroupAttributes, stylesCleaner } from '../../extensions/styles';
import {
	getAlignmentFlexStyles,
	getBlockBackgroundStyles,
	getBorderStyles,
	getBoxShadowStyles,
	getDisplayStyles,
	getMarginPaddingStyles,
	getOpacityStyles,
	getPositionStyles,
	getSizeStyles,
	getSVGStyles,
	getTransformStyles,
	getZIndexStyles,
	getOverflowStyles,
	getSVGWidthStyles,
	getFlexStyles,
	getBackgroundStyles,
	getTransitionStyles,
} from '../../extensions/styles/helpers';
import { selectorsSvgIcon } from './custom-css';
import transitionObj from './transitionObj';

const getWrapperObject = props => {
	const response = {
		border: getBorderStyles({
			obj: {
				...getGroupAttributes(props, [
					'border',
					'borderWidth',
					'borderRadius',
				]),
			},
			blockStyle: props.blockStyle,
		}),
		boxShadow: getBoxShadowStyles({
			obj: {
				...getGroupAttributes(props, 'boxShadow'),
			},
			blockStyle: props.blockStyle,
		}),
		opacity: getOpacityStyles({
			...getGroupAttributes(props, 'opacity'),
		}),
		size: getSizeStyles({
			...getGroupAttributes(props, 'size'),
		}),
		margin: getMarginPaddingStyles({
			obj: {
				...getGroupAttributes(props, 'margin'),
			},
		}),
		padding: getMarginPaddingStyles({
			obj: {
				...getGroupAttributes(props, 'padding'),
			},
		}),
		zIndex: getZIndexStyles({
			...getGroupAttributes(props, 'zIndex'),
		}),
		alignment: getAlignmentFlexStyles({
			...getGroupAttributes(props, 'alignment'),
		}),
		position: getPositionStyles({
			...getGroupAttributes(props, 'position'),
		}),
		transform: getTransformStyles({
			...getGroupAttributes(props, 'transform'),
		}),
		display: getDisplayStyles({
			...getGroupAttributes(props, 'display'),
		}),
		overflow: getOverflowStyles({
			...getGroupAttributes(props, 'overflow'),
		}),
		flex: getFlexStyles({
			...getGroupAttributes(props, 'flex'),
		}),
	};

	return response;
};

const getWrapperObjectHover = props => {
	const response = {
		border:
			props['border-status-hover'] &&
			getBorderStyles({
				obj: {
					...getGroupAttributes(
						props,
						['border', 'borderWidth', 'borderRadius'],
						true
					),
				},
				isHover: true,
				blockStyle: props.blockStyle,
			}),
		boxShadow:
			props['box-shadow-status-hover'] &&
			getBoxShadowStyles({
				obj: {
					...getGroupAttributes(props, 'boxShadow', true),
				},
				isHover: true,
				blockStyle: props.blockStyle,
			}),
	};

	return response;
};

const getNormalObject = props => {
	const response = {
		boxShadow: getBoxShadowStyles({
			obj: {
				...getGroupAttributes(props, 'boxShadow', false, 'svg-'),
			},
			blockStyle: props.blockStyle,
			prefix: 'svg-',
		}),
		padding: getMarginPaddingStyles({
			obj: {
				...getGroupAttributes(props, 'margin', false, 'svg-'),
			},
			prefix: 'svg-',
		}),
		margin: getMarginPaddingStyles({
			obj: {
				...getGroupAttributes(props, 'padding', false, 'svg-'),
			},
			prefix: 'svg-',
		}),
		border: getBorderStyles({
			obj: {
				...getGroupAttributes(
					props,
					['border', 'borderWidth', 'borderRadius'],
					false,
					'svg-'
				),
			},
			blockStyle: props.blockStyle,
			prefix: 'svg-',
		}),
		...getSVGWidthStyles(getGroupAttributes(props, 'svg')),
		...getBackgroundStyles({
			...getGroupAttributes(
				props,
				['background', 'backgroundColor', 'backgroundGradient'],
				false,
				'svg-'
			),
			blockStyle: props.blockStyle,
			prefix: 'svg-',
		}),
	};

	return response;
};

const getHoverObject = props => {
	const response = {
		border:
			props['svg-border-status-hover'] &&
			getBorderStyles({
				obj: {
					...getGroupAttributes(
						props,
						['border', 'borderWidth', 'borderRadius'],
						true,
						'svg-'
					),
				},
				isHover: true,
				blockStyle: props.blockStyle,
				prefix: 'svg-',
			}),
		boxShadow:
			props['svg-box-shadow-status-hover'] &&
			getBoxShadowStyles({
				obj: {
					...getGroupAttributes(props, 'boxShadow', true, 'svg-'),
				},
				isHover: true,
				blockStyle: props.blockStyle,
				prefix: 'svg-',
			}),
		...getBackgroundStyles({
			...getGroupAttributes(
				props,
				['background', 'backgroundColor', 'backgroundGradient'],
				true,
				'svg-'
			),
			blockStyle: props.blockStyle,
			isHover: true,
			prefix: 'svg-',
		}),
	};

	return response;
};

const getStyles = props => {
	const { uniqueID, blockStyle } = props;

	const response = {
		[uniqueID]: stylesCleaner(
			merge(
				{
					'': getWrapperObject(props),
					':hover': getWrapperObjectHover(props),
					' .maxi-svg-icon-block__icon': getNormalObject(props),
					' .maxi-svg-icon-block__icon:hover': getHoverObject(props),
					...getSVGStyles({
						obj: {
							...getGroupAttributes(props, 'svg'),
						},
						target: ' .maxi-svg-icon-block__icon',
						blockStyle,
					}),

					...(props['svg-status-hover'] && {
						...getSVGStyles({
							obj: {
								...getGroupAttributes(props, 'svgHover', true),
							},
							target: '.maxi-svg-icon-block__icon:hover',
							blockStyle,
							isHover: true,
						}),
					}),
					...getBlockBackgroundStyles({
						...getGroupAttributes(props, [
							'blockBackground',
							'border',
							'borderWidth',
							'borderRadius',
						]),
						blockStyle,
					}),
					...getBlockBackgroundStyles({
						...getGroupAttributes(
							props,
							[
								'blockBackground',
								'border',
								'borderWidth',
								'borderRadius',
							],
							true
						),
						isHover: true,
						blockStyle,
					}),
				},
				...getTransitionStyles(props, transitionObj)
			),
			selectorsSvgIcon,
			props
		),
	};

	return response;
};

export default getStyles;
