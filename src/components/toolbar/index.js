/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Popover } = wp.components;
const { useBlockEditContext } = wp.blockEditor;
const { Fragment } = wp.element;

/**
 * Internal dependencies
 */
import { __experimentalDraggableBlock } from '../index';

/**
 * Utils
 */
import {
    DragAndDrop,
    Style,
    ColumnPatterns,
    Duplicate,
    Link,
    Favorite,
    Delete
} from './utils';

/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Styles
 */
import './editor.scss';

/**
 * Component
 */
const MaxiToolbar = props => {
    const {
        className,
        // clientId
    } = props;

    const classes = classnames(
        'toolbar-wrapper',
        className
    )

    const {
        clientId,
        isSelected
    } = useBlockEditContext();

    const anchorRef = document.getElementById(`block-${clientId}`)

    return (
        <Fragment>
            {
                isSelected &&
                <Popover
                    noArrow
                    animate={false}
                    position='top right'
                    focusOnMount={false}
                    anchorRef={anchorRef}
                    className="maxi-toolbar__popover"
                >
                    <div
                        className={classes}
                    >
                        <DragAndDrop
                            clientId={clientId}
                        />
                        <Style />
                        <ColumnPatterns />
                        <Duplicate
                            clientId={clientId}
                        />
                        <Link
                            clientId={clientId}
                        />
                        <Favorite />
                        <Delete
                            clientId={clientId}
                        />
                    </div>
                </Popover>
            }
        </Fragment>
    )
}

export default MaxiToolbar;