import React, { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import StatusBar from "@components/status-bar";

import { WikiCharacterType } from '../../constants/type'
import { headerBtnsType } from './type'

import './index.less'

const headerBtns: headerBtnsType[] = [
  {
    value: '角色列表',
    onClick: () => null,
  },
  {
    value: '地点列表',
    onClick: () => null,
  },
  {
    value: '剧集列表',
    onClick: () => null,
  },
]

const Wiki: React.FC<any> = () => {
  const [randomCharacters, setRandomCharacters] = useState<WikiCharacterType[]>([])

  useEffect(() => {
    
  }, [])

  return (
    <View className='wiki'>
      <StatusBar backgroundColor='#ffffff' barStyle='dark-content' />
      <View className='wiki-header'>
        <View className='wiki-header-top'>
          <Text className='wiki-title'>Rick and Morty Wiki</Text>
        </View>
        <View className='wiki-header-bottom'>

        </View>
      </View>
      <View className='wiki-content'></View>
      <View className='wiki-footer'></View>
    </View>
  )
}

export default Wiki
