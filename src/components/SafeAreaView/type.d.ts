import { ViewProps } from '@tarojs/components/types/view';
import { ComponentOptions } from '@tarojs/taro';
import { FunctionComponent } from 'react';
import { NativeSafeAreaViewProps } from 'react-native-safe-area-context';

export interface TaroSafeAreaViewProps {
  style?: object;
}

export type TaroSafeAreaViewType = FunctionComponent<
  NativeSafeAreaViewProps & ViewProps
> & {
  options?: ComponentOptions;
};

// declare const TaroSafeAreaView: TaroSafeAreaViewType;

export default TaroSafeAreaViewType;
