/* eslint-disable */

import React from 'react';

import IconSwap from './IconSwap';
import IconSousuo from './IconSousuo';
import IconArrowRight from './IconArrowRight';
import IconArrowLift from './IconArrowLift';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'swap':
      return <IconSwap {...rest} />;
    case 'sousuo':
      return <IconSousuo {...rest} />;
    case 'arrow-right':
      return <IconArrowRight {...rest} />;
    case 'arrow-lift':
      return <IconArrowLift {...rest} />;
  }

  return null;
};

export default IconFont;
