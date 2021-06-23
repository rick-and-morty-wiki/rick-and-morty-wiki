import React, { memo } from 'react';
import { View, Image } from '@tarojs/components';
import loadingGif from '@assets/animation/loading.gif'

import './index.less'


// 在rn端，使用lottie实现动画
// let LottieView: any;
// if (IS_RN) {
//   LottieView = require("lottie-react-native");
// }

const Loading = () => {

  // if (IS_RN) {
  //   return (
  //     <LottieView
  //       source={require('@assets/animation/loading.json')}
  //       autoPlay
  //       loop
  //     />
  //   );
  // }
 
  return (
    <View className='loading'>
      <Image src={loadingGif} mode='aspectFit' />
    </View>
  );
};

export default memo(Loading);
