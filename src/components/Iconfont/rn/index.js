/* eslint-disable */

import React from 'react';

import IconArrowRight from './IconArrowRight';
import IconArrowLift from './IconArrowLift';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'arrow-right':
      return <IconArrowRight {...rest} />;
    case 'arrow-lift':
      return <IconArrowLift {...rest} />;
  }

  return null;
};

export default IconFont;
