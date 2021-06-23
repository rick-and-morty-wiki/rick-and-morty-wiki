import React, { useEffect, useState, useRef, useCallback } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'

import { StatusBar, CustomScrollView, CharacterCard, Iconfont } from "@components";
import { getCharacter } from '@service'
import { CharacterType } from '@constants/types'
import { wikiBackground } from '@assets/image'
import { defaultSixCharacters } from '@constants/wiki'
import { isArray } from '@utils'

import { headerBtnsType } from './type'
import './index.less'

// 顶部的按钮
const headerBtns: headerBtnsType[] = [
  {
    value: '角色',
    onClick: () => Taro.navigateTo({
      url: '/pages/wiki/pages/all-character/index',
    }),
  },
  {
    value: '剧集',
    onClick: () => Taro.navigateTo({
      url: '/pages/wiki/pages/all-episode/index',
    }),
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
  return getCharacter.list(rids)
}

const Wiki: React.FC<any> = () => {
  const [randomCharacters, setRandomCharacters] = useState<CharacterType[]>(defaultSixCharacters)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)
  const ScrollViewRef = useRef() as React.MutableRefObject<any>

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
      .then((data) => setRandomCharacters(data))
  }, [])

  const onRefresh = useCallback(() => {
    {
      Taro.showLoading({
        title: '加载中',
        mask: true,
      })
      // 滚到顶部
      if (process.env.TARO_ENV === 'rn') {
        ScrollViewRef.current.scrollTo({ y: 0 })
      } else {
        // 直接操控TaroElement，实现滚动到顶部。ref.current返回的就是一个TaroElement
        ScrollViewRef.current.setAttribute('scrollTop', 0)
      }
      return generateRandomCharacters(6)
        .then((data) => {
          Taro.hideLoading()
          if (isArray(data)) {
            setRandomCharacters(data)
          }
        })
    }
  }, [ScrollViewRef])

  return (
    <View className='wiki'>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />

      <CustomScrollView autoHideTab onRefresh={onRefresh} ref={ScrollViewRef} >
        <View className='wiki-header' style={{ marginTop: statusBarHeight }}>
          <Image src={wikiBackground} className='wiki-header-background' mode='widthFix' />
        </View>

        <View className='wiki-content'>
          <View className='wiki-content-top'>
            {
              headerBtns.map((btn, index) => (
                <Button
                  key={btn.value}
                  className={`wiki-content-btn wiki-content-btn_${index === headerBtns.length - 1 && 'last'}`}
                  hoverClass='btn_active'
                  hoverStyle={{ opacity: 0.6 }}
                  onClick={btn.onClick}
                >
                  <Text className='wiki-content-btn-value'>{btn.value}</Text>
                </Button>
              ))
            }
          </View>
          {
            randomCharacters.map(character => (
              <CharacterCard key={character.id} character={character} />
            ))
          }
        </View>

        <View className='wiki-footer'>
          <Button
            className='wiki-footer-btn'
            style={{ bottom: 0 }}
            onClick={onRefresh}
            hoverClass='btn_active'
            hoverStyle={{ opacity: 0.6 }}
          >
            <Iconfont name='swap' size={56} />
          </Button>
        </View>

      </CustomScrollView>
    </View>
  )
}

export default Wiki
