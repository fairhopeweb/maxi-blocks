/**
 * WordPress dependencies
 */
import { createRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import {
	getResizerSize,
	MaxiBlockComponent,
	withMaxiProps,
} from '../../extensions/maxi-block';
import { BlockResizer, Toolbar } from '../../components';
import { getLastBreakpointAttribute } from '../../extensions/styles';
import getStyles from './styles';
import { MaxiBlock, getMaxiBlockAttributes } from '../../components/maxi-block';

import copyPasteMapping from './copy-paste-mapping';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Content
 */
class edit extends MaxiBlockComponent {
	constructor(props) {
		super(props);

		this.resizableObject = createRef();
	}

	get getStylesObject() {
		return getStyles(this.props.attributes);
	}

	maxiBlockDidUpdate() {
		if (this.resizableObject.current) {
			const width = getLastBreakpointAttribute({
				target: 'width',
				breakpoint: this.props.deviceType,
				attributes: this.props.attributes,
			});
			const widthUnit = getLastBreakpointAttribute({
				target: 'width-unit',
				breakpoint: this.props.deviceType,
				attributes: this.props.attributes,
			});
			const height = `${getLastBreakpointAttribute({
				target: 'height',
				breakpoint: this.props.deviceType,
				attributes: this.props.attributes,
			})}${getLastBreakpointAttribute({
				target: 'height-unit',
				breakpoint: this.props.deviceType,
				attributes: this.props.attributes,
			})}`;

			const { width: resizerWidth, height: resizerHeight } =
				this.resizableObject.current.state;

			if (
				resizerWidth !== `${width}${widthUnit}` ||
				resizerHeight !== height
			) {
				this.resizableObject.current.updateSize({
					width: width ? `${width}${widthUnit}` : '100%',
					height,
				});
			}
		}
	}

	render() {
		const { attributes, deviceType, isSelected, maxiSetAttributes } =
			this.props;
		const { uniqueID, lineOrientation } = attributes;

		const classes = classnames(
			lineOrientation === 'vertical'
				? 'maxi-divider-block--vertical'
				: 'maxi-divider-block--horizontal',
			'maxi-divider-block__resizer',
			`maxi-divider-block__resizer__${uniqueID}`
		);
		const handleOnResizeStart = event => {
			event.preventDefault();

			const sizeUnit = getLastBreakpointAttribute({
				target: 'height-unit',
				breakpoint: deviceType,
				attributes,
			});

			if (sizeUnit === 'em')
				maxiSetAttributes({
					[`height-unit-${deviceType}`]: 'px',
				});
		};

		const handleOnResizeStop = (event, direction, elt) => {
			const sizeUnit = getLastBreakpointAttribute({
				target: 'height-unit',
				breakpoint: deviceType,
				attributes,
			});

			maxiSetAttributes({
				[`height-${deviceType}`]: getResizerSize(
					elt,
					this.blockRef,
					sizeUnit,
					'height'
				),
			});
		};

		const position = getLastBreakpointAttribute({
			target: 'position',
			breakpoint: deviceType,
			attributes,
		});

		// BlockResizer component comes with inherit styles where position is 'relative',
		// so we need to give style prop to change it when positioning is set 👌
		const style = {
			...(position && { position }),
		};

		const getIsOverflowHidden = () =>
			getLastBreakpointAttribute({
				target: 'overflow-y',
				breakpoint: deviceType,
				attributes,
			}) === 'hidden' &&
			getLastBreakpointAttribute({
				target: 'overflow-x',
				breakpoint: deviceType,
				attributes,
			}) === 'hidden';

		const inlineStylesTargets = {
			dividerColor: '.maxi-divider-block__divider',
		};

		return [
			<Inspector
				key={`block-settings-${uniqueID}`}
				inlineStylesTargets={inlineStylesTargets}
				{...this.props}
			/>,
			<Toolbar
				key={`toolbar-${uniqueID}`}
				ref={this.blockRef}
				prefix='divider-'
				inlineStylesTargets={inlineStylesTargets}
				{...this.props}
				copyPasteMapping={copyPasteMapping}
			/>,
			<MaxiBlock
				key={`maxi-divider--${uniqueID}`}
				ref={this.blockRef}
				classes={classes}
				resizableObject={this.resizableObject}
				{...getMaxiBlockAttributes(this.props)}
				tagName={BlockResizer}
				isOverflowHidden={getIsOverflowHidden()}
				defaultSize={{
					width: '100%',
					height: `${getLastBreakpointAttribute({
						target: 'height',
						breakpoint: deviceType,
						attributes,
					})}${getLastBreakpointAttribute({
						target: 'height-unit',
						breakpoint: deviceType,
						attributes,
					})}`,
				}}
				showHandle={isSelected}
				enable={{
					bottom: true,
				}}
				onResizeStart={handleOnResizeStart}
				onResizeStop={handleOnResizeStop}
				style={style}
			>
				{getLastBreakpointAttribute({
					target: 'divider-border-style',
					breakpoint: deviceType,
					attributes,
				}) !== 'none' && <hr className='maxi-divider-block__divider' />}
			</MaxiBlock>,
		];
	}
}

export default withMaxiProps(edit);
