import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { techPops, platPops } from '@constants/about'
import PopBtn from './components/PopBtn'
import './index.less'

const copy = (data: string) => {
  Taro.setClipboardData({ data })
}

const Wiki: React.FC<any> = () => {

  return (
    <View className='about'>
      <Text className='about-title'>
        Learn Once, Write Anywhere
      </Text>

      <View className='about-p'>
        <Text className='about-com'>本项目借助Taro实现了一套代码编译到微信小程序端和React Native端。以学习为主要目的，完全开源，欢迎志同道合的同学来提出宝贵的意见或提交代码~</Text>
      </View>

      <View className='about-subTitle'>
        <Text className='about-com'>技术栈：</Text>
      </View>

      <View className='about-box'>
        {
          techPops.map(pop => (
            <PopBtn
              key={pop.name}
              name={pop.name}
              content={pop.content}
            />
          ))
        }
      </View>

      <View className='about-subTitle'>
        <Text className='about-com'>平台支持：</Text>
      </View>

      <View className='about-box'>
        {
          platPops.map(pop => (
            <PopBtn
              key={pop.name}
              name={pop.name}
              content={pop.content}
            />
          ))
        }
      </View>

      <View className='about-p'>
        <Text className='about-com'>由于网络等限制，小程序端的速度较慢，APP上将会有更好的体验。可以前往项目的Github仓库下载APP，或者直接自己编译一个出来！</Text>
      </View>

      <View
        className='about-p'
        onClick={() => copy('https://github.com/rick-and-morty-wiki')}
        hoverClass='about-p_active'
        hoverStyle={{ opacity: 0.6 }}
      >
        <Text className='about-src-text'>Github地址：</Text>
        <Text className='about-src-text about-src-text_a'>The Rick and Morty Toy Wiki</Text>
      </View>

      <View
        className='about-p'
        onClick={() => copy('https://github.com/afuh/rick-and-morty-api')}
        hoverClass='about-p_active'
        hoverStyle={{ opacity: 0.6 }}
      >
        <Text className='about-src-text'>灵感和数据来源于：</Text>
        <Text className='about-src-text about-src-text_a'>rick-and-morty-api</Text>
      </View>

    </View>
  )
}

export default Wiki
