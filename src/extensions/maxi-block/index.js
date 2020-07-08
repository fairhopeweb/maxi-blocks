/**
 * Maxi Blocks Block component extension
 * 
 * @todo Comment properly
 */

/**
* WordPress dependencies
*/
const {
    dispatch,
    select,
    subscribe
} = wp.data;

/**
 * Internal dependencies
 */
import MaxiComponent from '../maxi-component';
import {
    ResponsiveStylesResolver,
    BackEndResponsiveStyles
} from '../styles';
import { getDefaultProp } from '../styles/utils';

/**
 * External dependencies
 */
import {
    isEmpty,
    uniqueId,
    isEqual,
    isNil,
    isObject
} from 'lodash';

/**
 * Class
 */
class MaxiBlock extends MaxiComponent {
    state = {
        styles: {},
        updating: false
    }

    constructor() {
        super(...arguments);
        this.uniqueIDChecker(this.props.attributes.uniqueID);
        this.fixProps();
    }

    componentDidMount() {
        this.displayStyles();
        this.saveProps();
    }

    componentDidUpdate() {
        this.displayStyles();

        if (!select('core/editor').isSavingPost() && this.state.updating) {
            this.setState({
                updating: false
            })
            this.saveProps();
        }
    }

    componentWillUnmount() {
        this.removeStyle();
    }

    uniqueIDChecker(idToCheck) {
        if (!isEmpty(document.getElementsByClassName(idToCheck))) {
            const newUniqueId = uniqueId(idToCheck.replace(idToCheck.match(/(\d+)(?!.*\d)/)[0], ''));

            this.uniqueIDChecker(newUniqueId);

            this.props.setAttributes({ uniqueID: newUniqueId })
        }
    }

    /**
     * In case some object has been modified and an old block has a prop that doesn't correspond
     * with that object, this shoudl help. It can grow with different handlers/helpers to fix errors.
     */
    fixProps() {
        Object.entries(this.props.attributes).map(([key, value]) => {
            let obj;
            try {
                obj = JSON.parse(value);
            } catch (error) {
                return;
            }

            if (!isObject(obj))
                return;

            const defaultObj = JSON.parse(getDefaultProp(this.props.clientId, key));

            const objKeys = Object.keys(obj).sort();
            const defaultObjKeys = Object.keys(defaultObj).sort();
            if (JSON.stringify(objKeys) != JSON.stringify(defaultObjKeys)) {
                const newObject = this.generalToDesktop(obj, defaultObj);
                this.props.setAttributes({ [key]: JSON.stringify(newObject) });
                this.props.attributes[key] = JSON.stringify(newObject);
            }
        })
    }

    generalToDesktop(obj, defaultObj) {
        if (obj.hasOwnProperty('general') && !obj.hasOwnProperty('desktop'))
            defaultObj.desktop = obj.general;

        return defaultObj;
    }

    /**
     * Fix preview displays
     */
    saveProps() {
        const unsubscribe = subscribe(() => {
            const isSavingPost = select('core/editor').isSavingPost();
            const isPreviewing = select('core/editor').isPreviewingPost();

            if (isSavingPost && !isPreviewing && !this.state.updating) {
                this.setState({
                    updating: true
                })
                unsubscribe();

                dispatch('maxiBlocks').saveMaxiStyles(this.getMeta(), true)
            }
        })
    }

    getMeta() {
        let meta = select('maxiBlocks').receiveMaxiStyles();

        switch (typeof meta) {
            case 'string':
                return JSON.parse(meta);
            case 'object':
                return meta;
            case 'undefined':
                return {}
        }
    }

    get getObject() {
        return null;
    }

    metaValue() {
        const obj = this.getObject;

        if (isEqual(obj, this.state.styles))
            return null;

        const meta = this.getMeta();

        this.setState({
            styles: obj
        })

        return new ResponsiveStylesResolver(obj, meta);
    }

    /** 
    * Refresh the styles on Editor
    */
    displayStyles() {
        const newMeta = this.metaValue();

        if (isNil(newMeta))
            return;
        this.saveMeta(newMeta);
    }

    removeStyle(target = this.props.attributes.uniqueID) {
        let cleanMeta = { ...this.getMeta() };
        Object.keys(this.getMeta()).map(key => {
            if (key.indexOf(target) >= 0)
                delete cleanMeta[key]
        })

        this.saveMeta(cleanMeta)
    }

    async saveMeta(newMeta) {
        dispatch('maxiBlocks').saveMaxiStyles(newMeta)
            .then(new BackEndResponsiveStyles(newMeta))
    }
}

export default MaxiBlock;