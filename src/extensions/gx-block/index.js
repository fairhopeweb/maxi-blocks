/**
 * Gutenberg Extra Block component extension
 */

/**
 * Internal dependencies
 */
import GXComponent from '../gx-component';

/**
 * External dependencies
 */
import { 
    isEmpty,
    uniqueId
} from 'lodash';

/**
 * Class
 */
class GXBlock extends GXComponent {

    constructor(){
        super(...arguments);
        this.uniqueIDChecker(this.props.attributes.uniqueID)
    }

    uniqueIDChecker(idToCheck) {
        if (!isEmpty(document.getElementsByClassName(idToCheck))) {
            const newUniqueId = uniqueId(idToCheck.replace(idToCheck.match(/(\d+)(?!.*\d)/)[0], ''));

            this.uniqueIDChecker(newUniqueId);

            this.props.setAttributes({ uniqueID: newUniqueId })
        }
    }
}

export default GXBlock;