/* 
  RN不支持css动画
  使用Animated库实现骨架屏幕
 */
import React, { useRef, useEffect } from 'react'
import { Text } from '@tarojs/components'
import { Animated } from 'react-native'

import '../index.less'

const RNSkeleton: React.FC = () => {
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
    <Animated.View
      className='character-episodes-btn'
      style={{ opacity: skeletonAnim }}
    >
      <Text className='character-episodes-btn-text'>S～E～</Text>
    </Animated.View>
  )
}

export default RNSkeleton