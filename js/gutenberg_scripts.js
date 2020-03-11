/**
 * Gutenberg Frontend Scripts
 * 
 * @version 0.1
 * 
 * 1 - Font Family resolver
 */

/**
 * Font Family resolver
 * Resolves the font source loading from Gutenberg blocks on frontend
 * 
 * @version 0.1
 */

class FontFamilyResolver {

    constructor() {
        this.elements = this.elemensGetter;
        this.getJSON();
    }

    /**
     * Returns an array with all the elements with a font-family CSS style option
     * 
     * @return {array} elements with font-family on inline style
     */

    get elemensGetter() {
        return Array.from(document.querySelectorAll('[style]')).filter(e => {
            return typeof window.getComputedStyle(e).getPropertyValue('font-family') !== '';
        })
    }

    /**
     * Returns a non-repeated element list of the family fonts founded on the DOM
     * 
     * @return {set} List of font families on the DOM
     */

    get DOMFontList() {
        let list = new Set();
        this.elements.map(e => {
            const fonts = window.getComputedStyle(e).getPropertyValue('font-family');
            fonts.split(',').map(font => {
                list = list.add(font.replace('"', '').trim());
            })
        })
        return list;
    }

    /**
     * Retrieve an object with all the GFonts options
     * 
     * @returns {object} GFonts options
     * @returns {null} 
     */

    get optionsGetter () {
        if ( document.getElementById('fontOptions') ) {
            return JSON.parse(document.getElementById('fontOptions').innerHTML);
        } else {
            return null;
        }
    }

    /**
     * Fetchs the JSON file with all the GFonts options
     */
 
    getJSON() {
        const fontsUrl = 'https://ddlicensed.s3-eu-west-1.amazonaws.com/gutenberg-extra/fonts.json';
        const options = {
            method: 'GET',
            mode: 'cors',
            header: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        fetch(fontsUrl, options)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                this.options = this.getFontFamilyOptions(data);
                document.body.classList.contains ( 'block-editor-page' ) ?   // WP
                    this.stampOptions():
                    null;
                this.onLoadPage();
            })
            .catch((err) => {
                console.log(err)
            });
    }

    /**
     * Sets a new element on DOM with all the GFonts options
     */

    stampOptions() {
        let script = document.createElement ( 'script' );
        script.id = 'fontOptions';
        script.innerHTML = JSON.stringify(this.options);
        document.body.appendChild ( script );
    }

    /**
     * Loads the non-loaded fonts on backend and frontend
     */

    onLoadPage() {
        const fontsToLoad = Array.from(this.DOMFontList);
        fontsToLoad.map( font => {
            this.options.forEach(e => {
                if (e.label === font) {
                    this.loadFonts(e.label, e.files);
                }
            })
        })
    }

    /**
     * Get font families from GFonts JSON file
     * 
     * @param {JSON} data Recibes JSON data with the fonts variants and properties
     * @returns {array} Options ready for React-Select 
     */

    getFontFamilyOptions(data) {
        let options = [];
        let items = data.items;
        items.map(item => {
            options.push({
                label: item.family,
                value: item.family,
                files: item.files
            });
        });
        return options;
    }

    /**
     * Loads the font on background using JS FontFace API
     * FontFaceSet API uses check() to check if a font exists, but needs to compare with some exact value:
     * in this case is used '12px' as a standard that returns if the font has been loaded.
     * 
     * @param {string} font Name of the selected font
     * @param {obj} files Different variations of the font
     */

    loadFonts = (font, files) => {
        if (document.fonts && document.fonts.check(`12px ${font}`) ) {   // FontFace API
            Object.entries(files).map(variant => {
                const style = this.getFontStyle(variant[0]);
                const fontLoad = new FontFace(font, `url(${variant[1]})`, style);
                document.fonts.add(fontLoad);
                fontLoad.loaded
                .catch((err) => {
                    console.info(__(`Font hasn't been able to download: ${err}`))
                })
            })
        }
    }

    /**
     * Prepares the styles to be ready for JS FontFace API
     * 
     * @param {obj} variant Concrete variant of the font with name and url
     * @returns {obj} Styles options for load the font on FontFace API
     */

    getFontStyle = (variant) => {
        const styles = variant.split(/([0-9]+)/).filter(Boolean);
        if (styles.length > 1) {
            return {
                style: `${styles[1]}`,
                weight: `${styles[0]}`
            };
        } else {
            const regExp = new RegExp('([0-9]+)', 'gm');
            if (styles[0].search(regExp) >= 0) {  // number
                return { weight: `${styles[0]}` };
            } else {
                return { style: `${styles[0]}` };
            }
        }
    }
}

document.onreadystatechange = function () {
    if ( document.readyState === 'complete') {
        new FontFamilyResolver;
    }
}

/**
 * Responsive Frontend Styles resolver
 * Creates a new object ready to deliver responsive styles on frontend
 * 
 * @todo    Comment and extend documentation
 * @todo    Clean deleted blocks on meta
 * @todo    Clean objecto on meta (don't need sync, or max, etc...)
 * @version 0.1
 */

class ResponsiveStylesResolver {
    constructor (target, meta, object) {
        this.target = target;
        this.meta = meta;
        this.object = object;
        this.initEvents();
    }

    initEvents() {
        if ( Object.entries(this.meta).length > 0 || this.meta.hasOwnProperty(this.target) ) {
            this.hasTarget()
        } else {
            this.noHasTarget()
        }     
    }

    hasTarget () {
        this.meta['block-image-box-1'][this.object.label] = this.object;
    }

    noHasTarget () {
        const newEntry = {
            [this.target] : {
                [this.object.label] : this.object
            }
        };

        this.meta = Object.assign (this.meta, newEntry);
    }

    get getNewValue() {
        return this.meta;
    }
}

/**
 * Adds responsive styles on backend
 * 
 * @todo    Comments and documentation
 * @version 0.1
 */

class BackEndResponsiveStyles {
    constructor (meta) {
        this.meta = meta;
        // Uses serverside loaded inline css
        this.target = document.getElementById ('gutenberg-extra-inline-css');
        typeof this.meta != 'undefined' ?
            this.initEvents() :
            null;
    }

    initEvents () {
        this.target == null ?
            this.createElement() :
            this.addValues();
    }

    createElement () {
        const style = document.createElement ( 'style' );
        style.id = 'gutenberg-extra-inline-css';
        document.body.appendChild (style);
        this.target = style;
        this.addValues();
    }

    addValues () {
        const content = this.createContent();
        this.target.innerHTML = content;
    }

    createContent () {
        let content = '';
        for (let [target, prop] of Object.entries(this.meta)) {
            for (let [key, value] of Object.entries(prop)) {
                const unit = value.unit;
                content += `.${target}{`;
                    content += this.getResponsiveStyles(value.desktop, unit);
                content += '}';
                content += `@media only screen and (max-width: 768px){.${key}{`;
                    content += this.getResponsiveStyles(value.tablet, unit);
                content += '}}';
                content += `@media only screen and (max-width: 768px){.${key}{`;
                    content += this.getResponsiveStyles(value.mobile, unit);
                content += '}}';
            }
        }
        return content;
    }

    getResponsiveStyles (styles, unit) {
        let responsiveStyles = '';
        for (let [key, value] of Object.entries(styles)) {
            key != 'sync' ?
                responsiveStyles += ` ${key}: ${value}${unit} !important;`:
                null;
        }
        return responsiveStyles;
    }
    
}