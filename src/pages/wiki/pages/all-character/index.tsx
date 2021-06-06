import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { StatusBar, CharacterCard } from "@components";
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/types'
import { defaultRandomCharacters } from '@constants/wiki'

import './index.less'


const Wiki: React.FC<any> = () => {
  const [characters, setCharacters] = useState<WikiCharacterType[]>(defaultRandomCharacters)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  // 给微信小程序导航栏那里垫一下
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })


  return (
    <View className='wiki' >
      <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <View className='wiki-header' style={{ marginTop: statusBarHeight }}>

      </View>

      <View className='wiki-content'>
        {
          characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
      </View>
    </View>
  )
}

export default Wiki
