import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector } from 'react-redux'
import { View, Text, Image, Button } from '@tarojs/components'

import { StatusBar, SafeAreaView } from "@components";
import { WikiCharacterType } from '@constants/type'
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
        <Image src={character.image} className='wiki-c-background' mode='aspectFill' />
        <View className='wiki-c-background wiki-c-background-mask'></View>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent animated />

        <View style={{ height: statusBarHeight + 4 }}></View>
        <View className='wiki-c-header'>
          <Button className='wiki-c-back' onClick={handleBack}></Button>
          <Image src={character.image} className='wiki-c-header-background' mode='widthFix' />
        </View>
        <View className='wiki-c-content'>
          <View className='wiki-c-title'>
            <Text className='wiki-c-title-text'>{character.name}</Text>
          </View>
          <View className='wiki-c-content-status'>
            <View className={`wiki-c-content-status-point wiki-c-content-status_${character.status}`}></View>
            <Text className='wiki-c-content-status-text'>{character.status + ' '}</Text>
            <Text className='wiki-c-content-status-text'>&nbsp;-&nbsp;</Text>
            <Text className='wiki-c-content-status-text'>{character.species + ' '}</Text>
          </View>
        </View>
        <View className='wiki-c-footer'>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Wiki
