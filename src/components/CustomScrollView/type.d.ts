import { ViewProps } from '@tarojs/components/types/view';
import { FunctionComponent } from 'react';

export interface CustomScrollViewProps {
  style?: object;
  onRefresh?: Function;
}

export type CustomScrollViewType = FunctionComponent<ViewProps & CustomScrollViewProps>
