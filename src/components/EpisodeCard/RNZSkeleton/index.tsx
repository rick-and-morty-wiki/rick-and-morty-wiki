/* 
  RN不支持css动画
  使用Animated库实现骨架屏幕
 */
import React, { useRef, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Animated } from 'react-native'

import { EpisodeType } from '@constants/types'

import '../index.rn.less'

interface RNSkeletonProps {
  episode: EpisodeType,
}

const RNSkeleton: React.FC<RNSkeletonProps> = ({
  episode,
}) => {
  const skeletonAnim = useRef(new Animated.Value(1)).current

  const startAnim = () => {
    Animated.sequence([
      Animated.timing(skeletonAnim, {
        duration: 500,
        isInteraction: false,
        toValue: 0.5,
        useNativeDriver: false,
      }),
      Animated.timing(skeletonAnim, {
        duration: 500,
        isInteraction: false,
        toValue: 1,
        useNativeDriver: false,
      }),
    ]).start((e) => {
      if (e.finished) {
        startAnim();
      }
    });
  }

  useEffect(() => {
    startAnim()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View key={episode.id} className='e-card'>
      <Animated.View
        className='e-card-left e-card-loading-left'
        style={{ opacity: skeletonAnim }}
      ></Animated.View>
      <Animated.View
        className='e-card-loading-right e-card-right'
        style={{ opacity: skeletonAnim }}
      >
        <View className='e-card-loading-name'></View>
        <View className='e-card-loading-date'></View>
      </Animated.View>
    </View>
  )
}

export default RNSkeleton