import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'
import { StatusBar, SafeAreaView } from "@components";
import { getCharacter } from '@service'

import { WikiCharacterType } from '@constants/type'
import { defaultCharacterImage } from '@assets/image'

import './index.less'


const Wiki: React.FC<any> = () => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)
  const wikiCharacter: WikiCharacterType = useSelector(state => state.wikiCharacter)

  // 给微信小程序导航栏那里垫一下
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })

  // 获取该角色信息，等等
  useEffect(() => {
    
  }, [])

  return (
    <SafeAreaView>
      <View className='wiki-c'>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <View className='wiki-c-header'>

        </View>
        <View className='wiki-c-content'>
          哈哈哈哈哈哈
        </View>
        <View className='wiki-c-footer'>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Wiki
