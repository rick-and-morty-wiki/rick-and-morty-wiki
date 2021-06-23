import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'

import { CharacterType } from '@constants/types'
import { updateWikiCharacter } from '@actions'
import { defaultCharacterImage } from '@assets/image'

import './index.less'

let RNSkeleton: any
if (process.env.TARO_ENV === 'rn') {
  RNSkeleton = require('./RNZSkeleton').default
}

interface CharacterCardProps {
  character: CharacterType,
  showImage?: boolean,
  number?: number,
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  showImage = true,
  number,
}) => {
  const dispatch = useDispatch()

  const handleClickCard = () => {
    dispatch(updateWikiCharacter(character))
    Taro.navigateTo({
      url: '/pages/wiki/pages/character/index',
    })
  }

  // 骨架屏
  if (!character.name) {
    // RN上的骨架屏
    if (process.env.TARO_ENV === 'rn') {
      return (
        <RNSkeleton character={character} showImage={showImage} />
      )
    }
    // 小程序上的骨架屏
    return (
      <View key={character.id} className='c-card'>
        {
          showImage &&
          <Image className='c-card-img c-card-loading-img' src={defaultCharacterImage} mode='widthFix' />
        }
        <View className='c-card-content c-card-loading-content'>
          <View className='c-card-loading-name'></View>
          <View className='c-card-loading-status'></View>
          <View className='c-card-loading-title'></View>
          <View className='c-card-loading-text'></View>
        </View>
      </View>
    )
  }

  return (
    <View
      key={character.id}
      className='c-card'
      onClick={handleClickCard}
      hoverClass='c-card_active'
      hoverStyle={{ opacity: 0.75 }}
    >
      {
        showImage &&
        <Image className='c-card-img' src={character.image} mode='widthFix' lazyLoad />
      }
      <View className='c-card-content'>
        <Text className='c-card-name'>{character.name}</Text>
        {
          number && <Text className='c-card-number'>{number}</Text>
        }
        <View className='c-card-status'>
          <View className={`c-card-status-point c-card-status_${character.status}`}></View>
          <Text className='c-card-status-text'>{character.status}</Text>
          <Text className='c-card-status-text'>&nbsp;-&nbsp;</Text>
          <Text className='c-card-status-text'>{character.species}</Text>
        </View>

        <View className='c-card-title'>
          <Text className='c-card-title-text'>location:</Text>
        </View>
        <Text className='c-card-text'>{character.location.name}</Text>
      </View>
    </View>
  )
}

export default memo(CharacterCard)