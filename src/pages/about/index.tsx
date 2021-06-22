import React from 'react'
import Taro from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'

import { myAvatar } from '@assets/image'

import './index.less'

const techs = [
  {
    name: 'Taro',
    comment: 'Taro3.2版本全面升级了对React Native的支持，在开发上体验还是比较丝滑的～',
  },
  {
    name: 'React + Redux + TypeScript',
    comment: '使用函数组件和Hook实现。',
  },
  {
    name: 'React Native',
    comment: '为了实现跨平台相同的体验，并且得益于Taro3.2的特性，的本项目使用到了一些React Native生态的库，如react-native-gesture-handler等。',
  },
]

const copy = (data: string) => {
  Taro.setClipboardData({ data })
}

const Wiki: React.FC<any> = () => {

  return (
    <View className='about'>
      <Text
        className='about-title'
        onClick={() => copy('https://github.com/rick-and-morty-wiki/rick-and-morty-wiki')}
      >rick-and-morty-wiki</Text>
      <View className='about-header'>
        <Text className='about-com'>     这是一个做着玩的项目，尝试使用Taro开发小程序、React Native的跨端应用。本项目以学习为主要目的，完全开源，欢迎志同道合的同学来交流学习，提出宝贵的意见或贡献代码~</Text>
        <Text className='about-com'>     技术栈：</Text>
      </View>

      <View className='about-box'>
        <View className='about-tech'>
          <Text className='about-tech-text'>Taro3</Text>
        </View>
        <View className='about-tech'>
          <Text className='about-tech-text'>React</Text>
        </View>
        <View className='about-tech'>
          <Text className='about-tech-text'>TypeScript</Text>
        </View>
        <View className='about-tech'>
          <Text className='about-tech-text'>React Native</Text>
        </View>
        <View className='about-tech'>
          <Text className='about-tech-text'>Redux</Text>
        </View>
      </View>

      <View className='about-subTitle'>
        <Text className='about-com'>     平台支持：</Text>
      </View>

      <View className='about-box'>
        <View className='about-tech'>
          <Text className='about-tech-text'>微信小程序</Text>
        </View>
        <View className='about-tech'>
          <Text className='about-tech-text'>Android</Text>
        </View>
        <View className='about-tech'>
          <Text className='about-tech-text'>IOS</Text>
        </View>
      </View>

      <View className='about-bottom'>
        <View className='about-src'>
          <Text className='about-src-text'>Github地址：</Text>
          <Text
            className='about-src-text about-src-text_a'
            onClick={() => copy('https://github.com/rick-and-morty-wiki')}
          >The Rick and Morty Toy Wiki</Text>
        </View>
        <View className='about-src'>
          <Text className='about-src-text'>灵感和数据来源于：</Text>
          <Text
            className='about-src-text about-src-text_a'
            onClick={() => copy('https://github.com/afuh/rick-and-morty-api')}
          >rick-and-morty-api</Text>
        </View>
      </View>
    </View>
  )
}

export default Wiki
