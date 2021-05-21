import React, { useEffect, useState } from 'react'
import Taro, { useDidShow, usePullDownRefresh } from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'

import { StatusBar, SafeAreaView } from "@components";
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/type'
import { wikiBackground, defaultCharacterImage } from '@assets/image'
import { defaultRandomCharacters } from '@constants/wiki'
import { updateWikiCharacter } from '@actions/wiki'

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


// 随机获取角色信息列表
const generateRandomCharacters = (number: number) => {
  const randomIds: number[] = []
  for (let i = 0; i < number; i++) {
    let rid: number = 1
    do {
      rid = Math.floor(Math.random() * 671) + 1
    } while (randomIds.indexOf(rid) !== -1)
    randomIds.push(rid)
  }
  return getCharacter(randomIds)
}


const Wiki: React.FC<any> = () => {
  const dispatch = useDispatch()
  const [randomCharacters, setRandomCharacters] = useState<WikiCharacterType[]>(defaultRandomCharacters)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  // 给微信小程序导航栏那里垫一下
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })

  // 下拉刷新，再随机6个
  usePullDownRefresh(() => {
    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    generateRandomCharacters(6)
    .then((data: WikiCharacterType[]) => {
      setRandomCharacters(data)
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
  })

  // 默认随机生成6个
  useEffect(() => {
    generateRandomCharacters(6)
      .then((data: WikiCharacterType[]) => setRandomCharacters(data))
  }, [])

  const handleClickCard = (id) => {
    dispatch(updateWikiCharacter(id))
    Taro.navigateTo({ 
      url: '/pages/wiki/pages/wiki-character/index',
    })
  }

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
            randomCharacters.map(character => {
              if (character.name) {
                return (
                  <View key={character.id} className='wiki-card' onClick={() => handleClickCard(character.id)}>
                    <Image className='wiki-card-img' src={character.image} mode='widthFix' />
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
                )
              }
              // 返回加载状态的组件
              return (
                <View key={character.id} className='wiki-card'>
                  <Image className='wiki-card-img wiki-card-loading-img' src={defaultCharacterImage} mode='widthFix' />
                  <View className='wiki-card-content'>
                    <View className='wiki-card-loading-name'></View>
                    <View className='wiki-card-loading-status'></View>
                    <View className='wiki-card-loading-title'></View>
                    <View className='wiki-card-loading-text'></View>
                    <View className='wiki-card-loading-title'></View>
                    <View className='wiki-card-loading-text'></View>
                  </View>
                </View>
              )
            })
          }
        </View>
        <View className='wiki-footer'></View>
      </View>
    </SafeAreaView>
  )
}

export default Wiki
