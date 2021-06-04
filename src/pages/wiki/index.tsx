import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import { StatusBar, CustomScrollView, CharacterCard } from "@components";
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/types'
import { wikiBackground } from '@assets/image'
import { defaultRandomCharacters } from '@constants/wiki'
import { isArray } from '@utils'

import { headerBtnsType } from './type'
import './index.less'


const headerBtns: headerBtnsType[] = [
  {
    value: '角色',
    onClick: () => null,
  },
  {
    value: '地点',
    onClick: () => null,
  },
  {
    value: '剧集',
    onClick: () => null,
  },
]

// 随机获取角色信息列表
const generateRandomCharacters = (number: number) => {
  const rids: number[] = []
  for (let i = 0; i < number; i++) {
    let rid: number
    do {
      rid = Math.floor(Math.random() * 671) + 1
    } while (rids.indexOf(rid) !== -1)
    rids.push(rid)
  }
  return getCharacter(rids)
}


const Wiki: React.FC<any> = () => {
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

  // 默认随机生成6个
  useEffect(() => {
    generateRandomCharacters(6)
      .then((data: WikiCharacterType[]) => setRandomCharacters(data))
  }, [])

  const onRefresh = () => {
    return generateRandomCharacters(6)
      .then((data: WikiCharacterType[]) => {
        if (isArray(data)) {
          setRandomCharacters(data)
        }
      })
  }

  return (
    <CustomScrollView className='wiki' onRefresh={onRefresh} >
      <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <View className='wiki-header' style={{ marginTop: statusBarHeight }}>
        <Image src={wikiBackground} className='wiki-header-background' mode='widthFix' />
      </View>

      <View className='wiki-content'>
        {
          randomCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
      </View>
    </CustomScrollView>
  )
}

export default Wiki
