/**
 * WordPress Dependencies
 */
const {	
    RadioControl, 
    RangeControl 
} = wp.components;

/**
 * Block
 */
const SizeControl = props => {

    const {
        label,
        className = '',
        unit,
        onChangeUnit,
        value,
        onChangeValue,
        minMaxSettings = {
            'px': {
                min: 0,
                max: 999
            },
            'em': {
                min: 0,
                max: 999
            },
            'vw': {
                min: 0,
                max: 999
            },
            '%': {
                min: 0,
                max: 999
            }
        }
    } = props;
    
    return (
        <div className={className}>
            <RadioControl
                className={'gx-unit-control'}
                selected={unit}
                options={[
                    { label: 'PX', value: 'px' },
                    { label: 'EM', value: 'em' },
                    { label: 'VW', value: 'vw' },
                    { label: '%', value: '%' },
                ]}
                onChange={onChangeUnit}
            />
            <RangeControl
                label={label}
                className={'gx-with-unit-control'}
                value={value}
                onChange={onChangeValue}
                min={minMaxSettings[unit].min}
                max={minMaxSettings[unit].max}
                allowReset={true}
                initialPosition={0}
            />
        </div>
    )
}

export default SizeControl;