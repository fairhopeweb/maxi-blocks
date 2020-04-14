const {
  __
} = wp.i18n;

const {
  SelectControl,
} = wp.components;

export const contentDirectionAttributes = {
  contentDirection:{
    type: 'string',
    default: 'column'
  },
}

export const ContentDirection = ( props ) => {
  const {
    contentDirection = props.attributes.contentDirection,
      setAttributes,
  } = props;

  const onChangeContentDirection = (value) => {
    setAttributes({contentDirection: value});
  }

  return (
    <SelectControl
        label={__('Content Direction', 'gutenberg-extra')}
        className="gx-block-style"
        value={contentDirection}
        options={[
            { label: __('From Left To Right'), value: 'row' },
            { label: __('From Right To Left'), value: 'row-reverse' },
            { label: __('From Top To Bottom'), value: 'column' },
            { label: __('From Bottom To Top'), value: 'column-reverse' },
        ]}
        onChange={ onChangeContentDirection }
    />
  )
}
