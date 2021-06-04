/* eslint-disable */

import React from 'react';

import IconArrowLift from './IconArrowLift';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'arrow-lift':
      return <IconArrowLift {...rest} />;
  }

  return null;
};

export default IconFont;
