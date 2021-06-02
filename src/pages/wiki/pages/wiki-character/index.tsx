import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Image, Button } from '@tarojs/components'

import { StatusBar } from "@components";
import { WikiCharacterType, WikiEpisodeType, RootState } from '@constants/types'
import { defaultCharacter, defaultEpisode } from '@constants/wiki'
import { getCharacter, getEpisode } from '@service'
import { updateWikiCharacter } from '@actions'

import './index.less'


const Wiki: React.FC<any> = () => {
  const dispatch = useDispatch()
  const character: WikiCharacterType = useSelector((state: RootState) => state.wikiCharacter.character)
  const [episodes, setEpisodes] = useState<WikiEpisodeType[]>([defaultEpisode])
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)

  // 给微信小程序导航栏那里垫一下
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })

  // 如果character.name为空，则请求角色数据
  useEffect(() => {
    if (!character.name) {
      dispatch(updateWikiCharacter(defaultCharacter))
      getCharacter(character.id)
        .then(data => dispatch(updateWikiCharacter(data)))
    }
  }, [character, dispatch])

  // 请求剧集信息
  useEffect(() => {
    const updateEpisodes = async () => {
      if (!episodes[0].name && character.episode.length > 0) {
        for (let ei = 0; ei < character.episode.length; ei++) {
          const episodeId = parseInt(character.episode[ei].split('episode/')[1])
          // 最多请求三个
          if (ei < 3) {
            await getEpisode(episodeId)
              .then(data => {
                if (ei === 0) {
                  setEpisodes([data])
                } else {
                  setEpisodes(preState => [...preState, data])
                }
              })
          }
        }
      }
    }
    updateEpisodes()
  }, [character, episodes])

  const handleBack = () => Taro.navigateBack()

  // 请求未完成，渲染骨架屏
  if (!character.name) {
    return <Text>2222</Text>
  }

  return (
    <View className='wiki-c'>
      <Image src={character.image} className='wiki-c-background' mode='aspectFill' />
      <View className='wiki-c-background wiki-c-background-mask'></View>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />

      <View style={{ height: statusBarHeight + 4 }}></View>
      <View className='wiki-c-header'>
        <Button className='wiki-c-back' onClick={handleBack}></Button>
        <Image src={character.image} className='wiki-c-header-background' mode='widthFix' />
      </View>
      <View className='wiki-c-content'>
        <View className='wiki-c-title'>
          <Text className='wiki-c-title-text'>{character.name}</Text>
        </View>

        <View className='wiki-c-content-box'>
          <View className='wiki-c-content-row'>
            <Text className='wiki-c-content-row-text'>状态：{character.status}</Text>
          </View>
          <View className='wiki-c-content-row'>
            <Text className='wiki-c-content-row-text'>物种：{character.species}</Text>
          </View>
          <View className='wiki-c-content-row'>
            <Text className='wiki-c-content-row-text'>性别：{character.gender}</Text>
          </View>
          {
            character.type &&
            <View className='wiki-c-content-row'>
              <Text className='wiki-c-content-row-text'>分类：{character.type}</Text>
            </View>
          }
        </View>

        <View className='wiki-c-content-row wiki-c-content-row_two' style={{ marginTop: 16 }}>
          <Text className='wiki-c-content-row-text'>首次出现地点：</Text>
          <Text className='wiki-c-content-row-text_a'>{character.origin.name}</Text>
        </View>

        <View className='wiki-c-content-row wiki-c-content-row_two'>
          <Text className='wiki-c-content-row-text'>最后出现地点：</Text>
          <Text className='wiki-c-content-row-text_a'>{character.location.name}</Text>
        </View>

        <View className='wiki-c-content-row wiki-c-content-row_two' style={{ marginTop: 16 }}>
          <Text className='wiki-c-content-row-text'>出现剧集：</Text>
        </View>

      </View>
      <View className='wiki-c-footer'>
        {
          episodes.map(episode => (
            <Button className='wiki-c-footer-btn' key={episode.episode}>{episode.episode + ' '}</Button>
          ))
        }
      </View>
    </View>
  )
}

export default Wiki
