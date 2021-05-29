import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components';

// 在rn端，使用lottie实现动画
let LottieView: any;
if (process.env.TARO_ENV === "rn") {
  LottieView = require("lottie-react-native");
}

const Loading = props => {

  if (process.env.TARO_ENV === "rn") {
    return (
      <LottieView
        source={require('../../../assets/animation/PinJump.json')}
        autoPlay
        loop
      />
    );
  }
 
  return (
    <View>加载中。。。</View>
  );
};

export default Loading;
