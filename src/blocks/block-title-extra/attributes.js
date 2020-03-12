import { blockStyleAttributes } from '../../components/block-styles/index';
import { paddingMarginControlAttributes } from '../../components/padding-margin-control/index';
import { linkOptionsAttributes } from '../../components/link-options/index';
import { dividerAttributes } from '../../components/divider/index';

const attributes = {
  title: {
      type: 'array',
      source: 'children',
      selector: '.gx-title-extra-title',
  },
  subtitle: {
      type: 'array',
      source: 'children',
      selector: '.gx-title-extra-subtitle',
  },
  titleTextAlign:{
    type: 'string',
    default: 'center'
  },
  subtitleTextAlign:{
    type: 'string',
    default: 'auto'
  },
  descriptionTextAlign:{
    type: 'string',
    default: 'center'
  },
  subtitleBackgroundColor:{
    type: 'string'
  },
  ...blockStyleAttributes,
  ...linkOptionsAttributes,
  ...dividerAttributes
};

export default attributes;
