/* eslint-disable react-hooks/rules-of-hooks */
/**
 * WordPress dependencies
 */
import {
	forwardRef,
	useEffect,
	useState,
	memo,
	useCallback,
	useReducer,
} from '@wordpress/element';
import { dispatch, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import {
	getHasParallax,
	getLastBreakpointAttribute,
} from '../../extensions/styles';
import InnerBlocksBlock from './innerBlocksBlock';
import MainMaxiBlock from './mainMaxiBlock';

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isEmpty, isEqual, isNil } from 'lodash';
import mobile from 'is-mobile';

/**
 * Styles
 */
import './editor.scss';

const INNER_BLOCKS = ['maxi-blocks/group-maxi', 'maxi-blocks/column-maxi'];

const DISALLOWED_BREAKPOINTS = ['m', 's', 'xs'];

const getBlockClassName = blockName => {
	return `maxi-${blockName
		.replace('maxi-blocks/', '')
		.replace('-maxi', '')}-block`;
};

const getBlockStyle = (attributes, breakpoint) => {
	const getValue = target =>
		getLastBreakpointAttribute({
			target,
			breakpoint,
			attributes,
		});

	const isFullWidth = getValue('full-width') === 'full';

	if (!isFullWidth) return {};

	const marginValue = 8;

	// Margin
	const marginRight = getValue('margin-right') || 0;
	const marginRightUnit = getValue('margin-right-unit') || 'px';
	const marginLeft = getValue('margin-left') || 0;
	const marginLeftUnit = getValue('margin-left-unit') || 'px';

	// Width
	const width = getValue('width');
	const widthUnit = getValue('width-unit');
	const maxWidth = getValue('max-width');
	const maxWidthUnit = getValue('max-width-unit');

	return {
		marginRight: `calc(${marginRight}${marginRightUnit} - ${marginValue}px)`,
		marginLeft: `calc(${marginLeft}${marginLeftUnit} - ${marginValue}px)`,
		width: `calc(${
			isFullWidth || isNil(width) ? '100%' : `${width}${widthUnit}`
		} + ${marginValue * 2}px)`,
		maxWidth: `calc(${
			isFullWidth || isNil(maxWidth)
				? '100%'
				: `${maxWidth}${maxWidthUnit}`
		} + ${marginValue * 2}px)`,
	};
};

const MaxiBlockContent = forwardRef((props, ref) => {
	const {
		clientId,
		blockName,
		tagName = 'div',
		children,
		blockStyle,
		extraClassName,
		anchorLink,
		uniqueID,
		className,
		displayValue,
		motion,
		background,
		disableBackground = false,
		isSave = false,
		classes: customClasses,
		paletteClasses,
		hasLink,
		useInnerBlocks = false,
		hasInnerBlocks = false,
		isSelected,
		hasSelectedChild,
		isHovered,
		isChild,
		...extraProps
	} = props;

	// To forbid the use of links for container blocks from having links when their child has one
	if (!isSave && useInnerBlocks && hasLink) {
		let childHasLink = false;
		const children = select('core/block-editor').getClientIdsOfDescendants([
			clientId,
		]);

		for (const child of children) {
			const attributes =
				select('core/block-editor').getBlockAttributes(child);

			if (
				!isEmpty(attributes.linkSettings?.url) ||
				(select('core/block-editor').getBlockName(child) ===
					'maxi-blocks/text-maxi' &&
					attributes.content.includes('<a '))
			) {
				childHasLink = true;
				break;
			}
		}
		if (childHasLink) {
			dispatch('core/block-editor').updateBlockAttributes(clientId, {
				linkSettings: {
					...extraProps.attributes.linkSettings,
					disabled: true,
				},
			});
		} else if (extraProps.attributes.linkSettings.disabled) {
			dispatch('core/block-editor').updateBlockAttributes(clientId, {
				linkSettings: {
					...extraProps.attributes.linkSettings,
					disabled: false,
				},
			});
		}
	}

	// In order to keep the structure that Gutenberg uses for the block,
	// is necessary to add some inline styles to the first hierarchy blocks.
	const { isFirstOnHierarchy } = extraProps.attributes;
	const style = getBlockStyle(extraProps.attributes, extraProps.deviceType);

	// Gets if the block is full-width
	const isFullWidth =
		getLastBreakpointAttribute({
			target: 'full-width',
			breakpoint: extraProps.deviceType,
			attributes: extraProps.attributes,
		}) === 'full';

	// Gets if the block has to be disabled due to the device type
	const isDisabled =
		DISALLOWED_BREAKPOINTS.includes(extraProps.baseBreakpoint) &&
		mobile({ tablet: true });

	// Unselect the block if it's disabled
	if (isDisabled && isSelected)
		setTimeout(() => {
			dispatch('core/block-editor').selectBlock();
		}, 0);

	// Are just necessary for the memo() part
	delete extraProps.attributes;
	delete extraProps.deviceType;
	delete extraProps.baseBreakpoint;
	delete extraProps.context;
	delete extraProps.state;

	// Not usable/necessary on save blocks
	const [isDragOverBlock, setIsDragOverBlock] = isSave ? [] : useState(false);

	const {
		isDraggingBlocks,
		getDraggedBlockClientIds,
		getBlockParentsByBlockName,
	} = select('core/block-editor');

	const isDragging = isDraggingBlocks();

	const draggedBlockClientIds = getDraggedBlockClientIds();
	const blockParents = getBlockParentsByBlockName(
		draggedBlockClientIds[0],
		INNER_BLOCKS,
		true
	);
	const isDraggingOrigin = blockParents.includes(clientId);

	if (!isSave && !INNER_BLOCKS.includes(blockName))
		useEffect(() => {
			if (!isDragging && isDragOverBlock) setIsDragOverBlock(false);
		}, [isDragging]);

	const classes = classnames(
		'maxi-block',
		!isSave && 'maxi-block--backend',
		blockName && getBlockClassName(blockName),
		motion['hover-type'] &&
			motion['hover-type'] !== 'none' &&
			`maxi-hover-effect maxi-hover-effect-${uniqueID}`,
		getHasParallax(background['background-layers']) &&
			`maxi-bg-parallax maxi-bg-parallax-${uniqueID}`,
		motion['number-counter-status'] &&
			`maxi-nc-effect maxi-nc-effect-${uniqueID}`,
		(motion['shape-divider-top-status'] ||
			motion['shape-divider-bottom-status']) &&
			`maxi-sd-effect maxi-sd-effect-${uniqueID}`,
		// blockStyle is included 'maxi-' prefix before #2885, now it's not and we need to add prefix to className
		// to support old blocks, we check if blockStyle has 'maxi-' prefix
		blockStyle && blockStyle.includes('maxi-')
			? blockStyle
			: `maxi-${blockStyle ?? 'light'}`,
		extraClassName,
		uniqueID,
		className,
		displayValue === 'none' && 'maxi-block-display-none',
		customClasses,
		paletteClasses,
		hasLink && 'maxi-block--has-link',
		isDragging && isDragOverBlock && 'maxi-block--is-drag-over',
		isHovered && 'maxi-block--is-hovered',
		isDisabled && 'maxi-block--disabled',
		!isSave && isFullWidth && 'maxi-block--full-width'
	);

	const onDragLeave = isSave
		? null
		: useCallback(({ target }) => {
				if (
					isDragOverBlock &&
					(!ref.current.isSameNode(target) ||
						isDraggingOrigin ||
						!ref.current.contains(target))
				)
					setIsDragOverBlock(false);
		  }, []);

	const onDragOver = isSave
		? null
		: useCallback(() => {
				const { getBlock } = select('core/block-editor');
				const { innerBlocks } = getBlock(clientId);

				const isLastOnHierarchy = isEmpty(innerBlocks)
					? true
					: innerBlocks.every(
							({ name }) =>
								![
									...INNER_BLOCKS,
									'maxi-blocks/row-maxi',
								].includes(name)
					  );

				if (
					!isDragOverBlock &&
					!isSave &&
					INNER_BLOCKS.includes(blockName) &&
					isLastOnHierarchy
				)
					setIsDragOverBlock(true);
		  }, []);

	const blockProps = {
		tagName,
		className: classes,
		ref,
		id: uniqueID,
		key: `maxi-block-${uniqueID}`,
		uniqueID,
		anchorLink,
		background,
		disableBackground: !disableBackground,
		isChild,
		isDisabled,
		isSave,
		...(!isSave && isFirstOnHierarchy && { style }),
		...(!isSave &&
			INNER_BLOCKS.includes(blockName) && {
				onDragLeave,
				onDragOver,
			}),
		...extraProps,
	};

	if (!useInnerBlocks)
		return <MainMaxiBlock {...blockProps}>{children}</MainMaxiBlock>;

	return (
		<InnerBlocksBlock
			{...blockProps}
			clientId={clientId}
			blockName={blockName}
			hasInnerBlocks={hasInnerBlocks}
			isSelected={isSelected}
			hasSelectedChild={hasSelectedChild}
		>
			{children}
		</InnerBlocksBlock>
	);
});

const MaxiBlock = memo(
	forwardRef((props, ref) => {
		const { clientId } = props;

		const [isHovered, setHovered] = useReducer(e => !e, false);

		return (
			<MaxiBlockContent
				key={`maxi-block-content__${clientId}`}
				ref={ref}
				onMouseEnter={setHovered}
				onMouseLeave={setHovered}
				isHovered={isHovered}
				{...props}
			/>
		);
	}),
	(rawOldProps, rawNewProps) => {
		const {
			attributes: oldAttr,
			isSelected: wasSelected,
			deviceType: oldDeviceType,
			context: oldContext,
			state: oldState,
		} = rawOldProps;

		const {
			attributes: newAttr,
			isSelected,
			deviceType: newDeviceType,
			context,
			state,
		} = rawNewProps;

		// Check differences between attributes
		if (!isEqual(oldAttr, newAttr)) return false;

		// Check differences between children
		if (rawOldProps?.children || rawNewProps?.children) {
			const areChildrenEqual = isEqual(
				rawOldProps.children,
				rawNewProps.children
			);

			if (!areChildrenEqual) return false;
		}

		if (select('core/block-editor').isDraggingBlocks()) return true;

		if (wasSelected !== isSelected) return false;

		if (!isEqual(oldDeviceType, newDeviceType)) return false;

		if (!isEqual(oldContext, context)) return false;

		if (!isEqual(oldState, state)) return false;

		const propsCleaner = props => {
			const response = {};

			const propsToClean = [
				'innerBlocksSettings',
				'resizableObject',
				'tagName',
				'background',
				'motion',
				'children',
			];

			Object.entries(props).forEach(([key, value]) => {
				if (
					!propsToClean.includes(key) &&
					typeof value !== 'function' &&
					typeof value !== 'object'
				)
					response[key] = value;
			});

			return response;
		};

		const oldProps = propsCleaner(rawOldProps);
		const newProps = propsCleaner(rawNewProps);

		return isEqual(oldProps, newProps);
	}
);

MaxiBlock.save = props => <MaxiBlockContent {...props} isSave />;

export default MaxiBlock;
