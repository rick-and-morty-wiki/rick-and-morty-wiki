import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { EpisodeType } from '@constants/types'
import './index.less'

let RNSkeleton: any
if (process.env.TARO_ENV === 'rn') {
  RNSkeleton = require('../RNSkeleton').default
}

interface EpisodeBtnProps {
  episode: EpisodeType,
  updateCharacterList_byEpisode: Function,
}

const EpisodeBtn: React.FC<EpisodeBtnProps> = ({
  episode,
  updateCharacterList_byEpisode,
}) => {

  const handleClickEpisode = () => {
    if (!episode.episode) {
      return
    }
    Taro.navigateTo({
      url: '/pages/wiki/pages/character-list/index',
    })
    updateCharacterList_byEpisode(episode.characters, {
      title: episode.episode,
      primary: episode.name,
      secondary: episode.air_date,
    })
  }

  // 骨架按钮
  if (!episode.id) {
    // RN端
    if (process.env.TARO_ENV === 'rn') {
      return <RNSkeleton />
    }
    // 小程序端
    return (
      <View className='character-episodes-btn character-episodes-loading'>
        <Text className='character-episodes-btn-text'>S～E～</Text>
      </View>
    )
  }

  return (
    <Button
      className={`character-episodes-btn character-episodes-btn_${!episode.name && 'none'}`}
      onClick={handleClickEpisode}
      hoverClass='btn_active'
      hoverStyle={{ opacity: 0.6 }}
    >
      <Text className='character-episodes-btn-text'>{episode.episode}</Text>
    </Button>
  )
}

export default EpisodeBtn