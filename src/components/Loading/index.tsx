import React, { memo } from 'react';
import { View, Image } from '@tarojs/components';
import loadingGif from '@assets/animation/loading.gif'

// 在rn端，使用lottie实现动画
let LottieView: any;
if (process.env.TARO_ENV === "rn") {
  LottieView = require("lottie-react-native");
}

const Loading = props => {

  if (process.env.TARO_ENV === "rn") {
    return (
      <LottieView
        source={require('@assets/animation/loading.json')}
        autoPlay
        loop
      />
    );
  }
 
  return (
    <View>
      <Image src={loadingGif} mode='widthFix' />
    </View>
  );
};

export default memo(Loading);
