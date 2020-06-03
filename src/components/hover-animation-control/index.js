/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { SelectControl } = wp.components;

/**
 * Component
 */
const HoverAnimationControl = ( props ) => {
    const {
        hoverAnimation,
        onChangeHoverAnimation,
        hoverAnimationOptions = [
            { label: __('None', 'maxi-blocks'), value: 'none' },
            { label: __('Other', 'maxi-blocks'), value: 'other' },
        ],
        hoverAnimationDuration,
        onChangeHoverAnimationDuration,
        animationDurationOptions = [
            { label: __('Shorter', 'maxi-blocks'), value: 'shorter' },
            { label: __('Short', 'maxi-blocks'), value: 'short' },
            { label: __('Normal', 'maxi-blocks'), value: 'normal' },
            { label: __('Long', 'maxi-blocks'), value: 'long' },
            { label: __('Longer', 'maxi-blocks'), value: 'longer' },
        ],
    } = props;

    return (
        <div className="maxi-hover-animation">
            <SelectControl
                label={__('Hover Animation', 'maxi-blocks')}
                className={'maxi-hover-animation__type'}
                value={hoverAnimation}
                options={hoverAnimationOptions}
                onChange={value => onChangeHoverAnimation( value )}
            />
            <SelectControl
                label={__('Animation Duration', 'maxi-blocks')}
                className={'maxi-hover-animation__duration'}
                value={hoverAnimationDuration}
                options={animationDurationOptions}
                onChange={value => onChangeHoverAnimationDuration( value )}
            />
        </div>
    )
}

export default HoverAnimationControl;