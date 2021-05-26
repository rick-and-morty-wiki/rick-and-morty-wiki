import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { StatusBar, Loading } from "@components";
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/type'

import './index.less'



const Game: React.FC<any> = () => {
  const [gaming, setGaming] = useState<boolean>(false)
  const [characters, setCharacters] = useState<WikiCharacterType[]>([])

  useEffect(() => {
    if (!gaming) {
      return
    }
    // 游戏开始
    Taro.showLoading({
      title: '加载中',
    })
    const getTenRandomCharacters = async () => {
      // 第一步，获取30个随机的不重复的id列表
      const rids: number[] = []
      for (let i = 0; i < 30; i++) {
        let rid: number
        do {
          rid = Math.floor(Math.random() * 671) + 1
        } while (rids.indexOf(rid) !== -1)
        rids.push(rid)
      }

      // 第二步，请求这30个id，找到10个status都不是unknown的角色
      const chasAll: WikiCharacterType[] = await getCharacter(rids)
      const chas: WikiCharacterType[] = []
      for (const cha of chasAll) {
        if (chas.length > 9) {
          break
        }
        if (cha.status !== 'Dead' && cha.status !== 'Alive') {
          chas.push(cha)
        }
      }
      setCharacters(chas)
      Taro.hideLoading()
    }

    getTenRandomCharacters()

  }, [gaming])

  // 未开始游戏
  if (!gaming) {
    return (
      <View className='game'>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <View className='game-pre-title'>
          <Text className='game-pre-title-text game-pre-title-text_red'>Dead</Text>
          <Text className='game-pre-title-text'>or</Text>
          <Text className='game-pre-title-text game-pre-title-text_green'>Alive</Text>
        </View>
        <View className='game-pre-comment'>
          <Text className='game-pre-comment-text'>判断每一个出场的角色是Dead还是Alive！</Text>
        </View>
        <Button className='game-pre-btn' onClick={() => setGaming(true)}>开始</Button>
      </View>
    )
  }

  return (
    <View className='game'>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <Loading />
    </View>
  )
}

export default Game
