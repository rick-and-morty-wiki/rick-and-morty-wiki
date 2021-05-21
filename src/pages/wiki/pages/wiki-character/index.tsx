import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'

import { StatusBar, SafeAreaView } from "@components";
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/type'
import { defaultCharacterImage } from '@assets/image'
import { RootState } from '@reducers'

import './index.less'


const Wiki: React.FC<any> = () => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)
  const character: WikiCharacterType = useSelector((state: RootState) => state.wikiCharacter.character)

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
  }, [character])

  return (
    <SafeAreaView>
      <View className='wiki-c'>
        {/* <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent /> */}
        <View className='wiki-c-header'>

        </View>
        <View className='wiki-c-content'>
          {
            JSON.stringify(character)
          }
        </View>
        <View className='wiki-c-footer'>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Wiki
