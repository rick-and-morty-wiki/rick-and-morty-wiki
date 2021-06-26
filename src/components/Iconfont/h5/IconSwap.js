/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconSwap = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M822.496 473.152a32 32 0 0 0-31.392 55.776l97.450667 54.848c20.32 11.434667 45.653333-2.005333 47.594666-25.248 1.674667-20.16 2.517333-35.573333 2.517334-46.528C938.666667 276.362667 747.637333 85.333333 512 85.333333S85.333333 276.362667 85.333333 512s191.029333 426.666667 426.666667 426.666667c144.106667 0 276.053333-72.032 354.752-189.536a32 32 0 1 0-53.173333-35.616C746.645333 813.461333 634.538667 874.666667 512 874.666667c-200.298667 0-362.666667-162.368-362.666667-362.666667s162.368-362.666667 362.666667-362.666667c197.098667 0 357.472 157.226667 362.538667 353.109334l-52.042667-29.290667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconSwap.defaultProps = {
  size: 18,
};

export default IconSwap;
