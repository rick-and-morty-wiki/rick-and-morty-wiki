/* eslint-disable */
import React, { FunctionComponent } from 'react';

interface Props {
  name: 'swap' | 'sousuo' | 'arrow-right' | 'arrow-lift';
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
