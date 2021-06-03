import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'

import { WikiCharacterType } from '@constants/types'
import { updateWikiCharacter } from '@actions'
import { defaultCharacterImage } from '@assets/image'

import './index.less'

type CharacterCard = {
  character: WikiCharacterType
}


const CharacterCard: React.FC<CharacterCard> = ({
  character
}) => {
  const dispatch = useDispatch()

  const handleClickCard = () => {
    dispatch(updateWikiCharacter(character))
    Taro.navigateTo({
      url: '/pages/wiki/pages/wiki-character/index',
    })
  }

  if (!character.name) {
    return (
      <View key={character.id} className='character'>
        <Image className='character-img character-loading-img' src={defaultCharacterImage} mode='widthFix' />
        <View className='character-content'>
          <View className='character-loading-name'></View>
          <View className='character-loading-status'></View>
          <View className='character-loading-title'></View>
          <View className='character-loading-text'></View>
        </View>
      </View>
    )
  }

  return (
    <View key={character.id} className='character' onClick={handleClickCard}>
      <Image className='character-img' src={character.image} mode='widthFix' lazyLoad />
      <View className='character-content'>
        <Text className='character-name'>{character.name}</Text>
        <View className='character-status'>
          <View className={`character-status-point character-status_${character.status}`}></View>
          <Text className='character-status-text'>{character.status}</Text>
          <Text className='character-status-text'>&nbsp;-&nbsp;</Text>
          <Text className='character-status-text'>{character.species}</Text>
        </View>

        <View className='character-title'>
          <Text className='character-title-text'>location:</Text>
        </View>
        <Text className='character-text'>{character.location.name}</Text>
      </View>
    </View>
  )
}

export default memo(CharacterCard)