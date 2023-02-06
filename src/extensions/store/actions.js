/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { getIsSiteEditor } from '../fse';
import getWinBreakpoint from '../dom/getWinBreakpoint';

const actions = {
	receiveMaxiSettings() {
		return {
			type: 'RECEIVE_GENERAL_SETTINGS',
		};
	},
	receiveMaxiBreakpoints() {
		return {
			type: 'RECEIVE_BREAKPOINTS',
		};
	},
	sendMaxiSettings(settings) {
		return {
			type: 'SEND_GLOBAL_SETTINGS',
			settings,
		};
	},
	sendMaxiBreakpoints(breakpoints) {
		return {
			type: 'SEND_BREAKPOINTS',
			breakpoints,
		};
	},
	receiveMaxiDeviceType() {
		return {
			type: 'RECEIVE_DEVICE_TYPE',
		};
	},
	sendMaxiDeviceType(deviceType) {
		return {
			type: 'SEND_DEVICE_TYPE',
			deviceType,
		};
	},
	setMaxiDeviceType({
		deviceType: rawDeviceType,
		width,
		isGutenbergButton = false,
		changeSize = true,
	}) {
		const { receiveBaseBreakpoint, receiveMaxiBreakpoints } =
			select('maxiBlocks');
		const breakpoints = receiveMaxiBreakpoints();

		const getDeviceType = () => {
			if (rawDeviceType) {
				return rawDeviceType;
			}
			const winBreakpoint = getWinBreakpoint(width, breakpoints);
			const baseBreakpoint = receiveBaseBreakpoint();
			if (winBreakpoint === baseBreakpoint) {
				return 'general';
			}
			return winBreakpoint;
		};
		const deviceType = getDeviceType();

		if (!isGutenbergButton) {
			const isSiteEditor = getIsSiteEditor();

			const setPreviewDeviceType = dispatch(
				`core/edit-${isSiteEditor ? 'site' : 'post'}`
			).__experimentalSetPreviewDeviceType;

			setPreviewDeviceType('Desktop');
		}

		return {
			type: 'SET_DEVICE_TYPE',
			deviceType,
			isGutenbergButton,
			changeSize,
		};
	},
	setEditorContentSize(editorContentSize) {
		return {
			type: 'SET_EDITOR_CONTENT_SIZE',
			editorContentSize,
		};
	},
	copyStyles(copiedStyles) {
		return {
			type: 'COPY_STYLES',
			copiedStyles,
		};
	},
	copyNestedBlocks(copiedBlocks) {
		return {
			type: 'COPY_BLOCKS',
			copiedBlocks,
		};
	},
	updateInspectorPath(inspectorPath) {
		return {
			type: 'UPDATE_INSPECTOR_PATH',
			inspectorPath,
		};
	},
	saveDeprecatedBlock({ uniqueID, attributes }) {
		return {
			type: 'SAVE_DEPRECATED_BLOCK',
			uniqueID,
			attributes,
		};
	},
	removeDeprecatedBlock(uniqueID) {
		return {
			type: 'REMOVE_DEPRECATED_BLOCK',
			uniqueID,
		};
	},
};
export default actions;
