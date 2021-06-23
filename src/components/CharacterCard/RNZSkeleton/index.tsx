/* 
  RN不支持css动画
  使用Animated库实现骨架屏幕
 */
import React, { useRef, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { Animated } from 'react-native'

import { CharacterType } from '@constants/types'
import { defaultCharacterImage } from '@assets/image'

import '../index.rn.less'

interface RNSkeletonProps {
  character: CharacterType,
  showImage?: boolean,
}

const RNSkeleton: React.FC<RNSkeletonProps> = ({
  character,
  showImage = true,
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
    <View key={character.id} className='c-card' >
      {
        showImage &&
        <Animated.View style={{ opacity: skeletonAnim }}>
          <Image className='c-card-img c-card-loading-img' src={defaultCharacterImage} mode='widthFix' />
        </Animated.View>
      }
      <Animated.View
        className='c-card-content'
        style={{ opacity: skeletonAnim }}
      >
        <View className='c-card-loading-name'></View>
        <View className='c-card-loading-status'></View>
        <View className='c-card-loading-title'></View>
        <View className='c-card-loading-text'></View>
      </Animated.View>
    </View>
  )
}

export default RNSkeleton