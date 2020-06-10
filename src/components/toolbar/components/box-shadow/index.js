/**
 * WordPress dependencies
 */
const { Fragment } = wp.element;
const {
    Icon,
    Dropdown,
    Button,
} = wp.components;
const {
    useSelect,
    useDispatch,
} = wp.data;

/**
 * Internal dependencies
 */
import BoxShadowControl from '../../../box-shadow-control';

/**
 * External dependencies
 */
import { isNil } from 'lodash';

/**
 * Icons
 */
import './editor.scss';
import { toolbarDropShadow } from '../../../../icons';
import { boxShadowBottom } from '../../../box-shadow-control/defaults';

/**
 * BoxShadow
 */
const ALLOWED_BLOCKS = [
    'maxi-blocks/text-maxi',
    'maxi-blocks/button-maxi',
    'maxi-blocks/image-maxi',
    'maxi-blocks/divider-maxi',
    'maxi-blocks/section-maxi',
]

const BoxShadow = props => {
    const {
        clientId,
        blockName
    } = props;

    if (!ALLOWED_BLOCKS.includes(blockName))
        return null;

    const { boxShadow } = useSelect(
        (select) => {
            const { getBlockAttributes } = select(
                'core/block-editor',
            );
            return {
                boxShadow: getBlockAttributes(clientId).boxShadow,
            };
        },
        [clientId]
    );

    const { updateBlockAttributes } = useDispatch(
        'core/block-editor'
    );

    return (
        <Fragment>
            {
                !isNil(boxShadowBottom) &&
                <Dropdown
                    className='toolbar-item toolbar-item__dropdown'
                    renderToggle={({ isOpen, onToggle }) => (
                        <Button
                            className='toolbar-item__box-shadow'
                            onClick={onToggle}
                            aria-expanded={isOpen}
                            action="popup"
                        >
                            <Icon
                                className='toolbar-item__icon'
                                icon={toolbarDropShadow}
                            />
                        </Button>
                    )}
                    popoverProps={
                        {
                            className: 'toolbar-item__popover',
                            noArrow: false,
                            position: 'top center'
                        }
                    }
                    renderContent={
                        () => (
                            <BoxShadowControl
                                boxShadowOptions={JSON.parse(boxShadow)}
                                onChange={boxShadow => updateBlockAttributes(
                                    clientId,
                                    { boxShadow }
                                )}
                            />
                        )
                    }
                />
            }
        </Fragment>
    )
}

export default BoxShadow;