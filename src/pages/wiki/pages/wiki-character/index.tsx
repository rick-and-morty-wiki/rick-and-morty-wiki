import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Text, Image, Button } from '@tarojs/components'

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

  const handleBack = () => Taro.navigateBack()

  // 请求未完成，渲染骨架屏
  if (!character.name) {
    return <Text>2222</Text>
  }

  return (
    <SafeAreaView>
      <View className='wiki-c'>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent animated />
        <Button className='wiki-c-back' style={{ top: statusBarHeight + 8, left: 16 }} onClick={handleBack}></Button>

        <View className='wiki-c-header'>
          <Image src={character.image} className='wiki-c-header-background' mode='widthFix' />
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
