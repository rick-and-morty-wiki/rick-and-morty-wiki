import { ViewProps } from '@tarojs/components/types/view';
import { FunctionComponent } from 'react';

export interface CustomScrollViewProps {
  className?: string,
  style?: object,
  onRefresh?: Function,
  autoHideTab?: boolean,
}

export type CustomScrollViewType = FunctionComponent<ViewProps & CustomScrollViewProps>
