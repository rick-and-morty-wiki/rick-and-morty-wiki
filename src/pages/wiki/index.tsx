import React, { useEffect, useState } from 'react'
import { View, Text, Image } from '@tarojs/components'
import StatusBar from "@components/status-bar";

import { WikiCharacterType } from '../../constants/type'
import { headerBtnsType } from './type'

import { getCharacter } from '../../service'

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
    getCharacter(1).then(res => {
      setRandomCharacters([res])
    })
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
      <View className='wiki-content'>
        {JSON.stringify(randomCharacters)}
        <Image src='https://rickandmortyapi.com/api/character/avatar/1.jpeg' />
      </View>
      <View className='wiki-footer'></View>
    </View>
  )
}

export default Wiki
