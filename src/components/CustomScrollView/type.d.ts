import { ScrollViewProps } from '@tarojs/components/types/ScrollView';
import { FunctionComponent } from 'react';

export interface CustomScrollViewProps {
  className?: string,
  style?: object,
  onRefresh?: Function,
  autoHideTab?: boolean,
}

export type CustomScrollViewType = FunctionComponent<ScrollViewProps & CustomScrollViewProps>
