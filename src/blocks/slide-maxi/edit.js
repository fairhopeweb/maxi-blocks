/**
 * Wordpress dependencies
 */
import { select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Inspector from './inspector';
import { MaxiBlockComponent, withMaxiProps } from '../../extensions/maxi-block';
import { MaxiBlock, getMaxiBlockAttributes } from '../../components/maxi-block';
import { BlockInserter, Toolbar } from '../../components';
import { getLastBreakpointAttribute } from '../../extensions/styles';
import getStyles from './styles';
import SliderContext from '../slider-maxi/context';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { copyPasteMapping } from './data';

/**
 * Editor
 */
class edit extends MaxiBlockComponent {
	static contextType = SliderContext;

	get getStylesObject() {
		return getStyles(this.props.attributes);
	}

	maxiBlockDidMount() {
		const { clientId } = this.props;

		this.context?.setSlideWidth(
			clientId,
			this.blockRef.current.getBoundingClientRect().width
		);
	}

	maxiBlockDidUpdate(prevProps) {
		const { clientId, isSelected } = this.props;
		const { isSelected: wasSelected } = prevProps;
		const { width } = this.blockRef.current.getBoundingClientRect();

		if (this.context?.slidesWidth[clientId] !== width) {
			this.context?.setSlideWidth(clientId, width);
		}
		if (isSelected !== wasSelected && isSelected) {
			this.context?.onSelect(clientId);
			this.blockRef.current.setAttribute('data-slide-active', 'true');
		}
	}

	maxiBlockWillUnmount() {
		const { clientId } = this.props;
		this.context?.onRemoveSlide(clientId);
	}

	render() {
		const { attributes, deviceType, hasInnerBlocks, clientId } = this.props;
		const { uniqueID, styleID } = attributes;

		const ALLOWED_BLOCKS = wp.blocks
			.getBlockTypes()
			.map(block => block.name)
			.filter(
				blockName =>
					[
						'maxi-blocks/container-maxi',
						'maxi-blocks/slide-maxi',
						'maxi-blocks/maxi-cloud',
					].indexOf(blockName) === -1
			);

		const emptySlideClass = `maxi-slide-block__${
			hasInnerBlocks ? 'has-innerBlock' : 'empty'
		}`;
		const isActive =
			this.context?.selected ===
			select('core/block-editor').getBlockIndex(clientId);

		return [
			<Inspector key={`block-settings-${uniqueID}`} {...this.props} />,
			<Toolbar
				key={`toolbar-${uniqueID}`}
				ref={this.blockRef}
				propsToAvoid={['resizableObject']}
				copyPasteMapping={copyPasteMapping}
				{...this.props}
			/>,
			<MaxiBlock
				key={`maxi-slide--${uniqueID}`}
				ref={this.blockRef}
				{...getMaxiBlockAttributes(this.props)}
				tagName='li'
				data-slide-active={isActive}
				classes={classnames(
					emptySlideClass,
					'maxi-block',
					'maxi-block--backend',
					'maxi-slide-block',
					'maxi-slide-block__resizer',
					`maxi-slide-block__resizer__${uniqueID}`,
					getLastBreakpointAttribute({
						target: 'display',
						breakpoint: deviceType,
						attributes,
						isHover: false,
						forceSingle: true,
					}) === 'none' && 'maxi-block-display-none'
				)}
				useInnerBlocks
				innerBlocksSettings={{
					allowedBlocks: ALLOWED_BLOCKS,
					orientation: 'horizontal',
					templateLock: false,
					renderAppender: !hasInnerBlocks
						? () => <BlockInserter clientId={clientId} />
						: false,
				}}
				data-maxi-style-id={styleID}
			/>,
		];
	}
}

export default withMaxiProps(edit);
