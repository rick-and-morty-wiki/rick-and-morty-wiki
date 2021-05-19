import React, { useEffect, useState } from 'react'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { StatusBar, SafeAreaView } from "@components";
import { getCharacter } from '@service'

import { WikiCharacterType } from '../../constants/type'
import { headerBtnsType } from './type'
import wikiBackground from '../../assets/image/wiki_background.png'

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
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  // 给微信小程序导航栏那里垫一下
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })

  usePullDownRefresh(() => { })

  useEffect(() => {
    // 生成6个随机的不重复的id
    const randomIds: number[] = []
    for (let i = 0; i < 6; i++) {
      let rid: number = 1
      do {
        rid = Math.floor(Math.random() * 671) + 1
      } while (randomIds.indexOf(rid) !== -1)
      randomIds.push(rid)
    }
    getCharacter(randomIds)
      .then(data => setRandomCharacters(data))

  }, [])


  return (
    <SafeAreaView>
      <View className='wiki'>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <View className='wiki-header' style={{ marginTop: statusBarHeight }}>

          <Image src={wikiBackground} className='wiki-header-background' mode='aspectFit' />

          <View className='wiki-header-top'>
            <Text className='wiki-title'>The Rick and Morty Wiki</Text>
          </View>
          <View className='wiki-header-bottom'>

          </View>
        </View>
        <View className='wiki-content'>
          {
            randomCharacters.map(character => (
              <View key={character.id} className='wiki-card'>
                <Image className='wiki-card-image' src={character.image} mode='widthFix' />
                <View className='wiki-card-content'>
                  <Text className='wiki-card-name'>{character.name}</Text>
                  <View className='wiki-card-status'>
                    <View className={`wiki-card-status-point wiki-card-status_${character.status}`}></View>
                    <Text className='wiki-card-status-text'>{character.status + ' '}</Text>
                    <Text className='wiki-card-status-text'>&nbsp;-&nbsp;</Text>
                    <Text className='wiki-card-status-text'>{character.species + ' '}</Text>
                  </View>

                  <View className='wiki-card-title'>
                    <Text className='wiki-card-title-text'>Last known location:</Text>
                  </View>
                  <Text className='wiki-card-text'>{character.location.name}</Text>
                  <View className='wiki-card-title'>
                    <Text className='wiki-card-title-text'>First seen in:</Text>
                  </View>
                  <Text className='wiki-card-text'>{character.origin.name}</Text>
                </View>
              </View>
            ))
          }
        </View>
        <View className='wiki-footer'></View>
      </View>
    </SafeAreaView>
  )
}

export default Wiki
