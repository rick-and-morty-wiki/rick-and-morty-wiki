import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Image, Button } from '@tarojs/components'

import { StatusBar, Back, Loading } from "@components";
import { EpisodeType, RootState } from '@constants/types'
import { defaultCharacter, defaultEpisode } from '@constants/wiki'
import { getEpisode } from '@service'
import { updateWikiCharacter } from '@actions'

import './index.less'


const Wiki: React.FC<any> = () => {
  const dispatch = useDispatch()
  const character = useSelector((state: RootState) => state.wikiCharacter.character)
  const [episodes, setEpisodes] = useState<EpisodeType[]>([defaultEpisode])
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
    if (!character.name && character.id !== 0) {
      dispatch(updateWikiCharacter(defaultCharacter))
    }
  }, [character, dispatch])

  // 请求剧集信息
  useEffect(() => {
    const updateEpisodes = async () => {
      if (!episodes[0].name && character.episode.length > 0) {
        for (let ei = 0; ei < character.episode.length; ei++) {
          const episodeId = parseInt(character.episode[ei].split('episode/')[1])
          // 最多请求4个
          if (ei < 4) {
            await getEpisode.one(episodeId)
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
    if (character.name) {
      updateEpisodes()
    }
  }, [character, episodes])


  // 请求未完成，渲染骨架屏
  if (!character.name) {
    return (
      <View className='character'>
        <Loading />
      </View>
    )
  }

  return (
    <View className='character'>
      <Image src={character.image} className='character-background' mode='aspectFill' />
      <View className='character-background character-background-mask'></View>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />

      <View style={{ height: statusBarHeight + 4 }}></View>
      <View className='character-header'>
        <Back className='character-back' />
        <Image src={character.image} className='character-header-background' mode='widthFix' />
      </View>

      <View className='character-content'>
        <View className='character-title'>
          <Text className='character-title-text'>{character.name}</Text>
        </View>

        <View className='character-content-box'>
          <View className='character-content-row'>
            <Text className='character-content-row-text'>状态：{character.status}</Text>
          </View>
          <View className='character-content-row'>
            <Text className='character-content-row-text'>物种：{character.species}</Text>
          </View>
          <View className='character-content-row'>
            <Text className='character-content-row-text'>性别：{character.gender}</Text>
          </View>
          {
            character.type &&
            <View className='character-content-row'>
              <Text className='character-content-row-text'>分类：{character.type}</Text>
            </View>
          }
        </View>

        <View className='character-content-row character-content-row_two' style={{ marginTop: 16 }}>
          <Text className='character-content-row-text'>首次出现地点：</Text>
          <Text className='character-content-row-text_a'>{character.origin.name}</Text>
        </View>

        <View className='character-content-row character-content-row_two'>
          <Text className='character-content-row-text'>最后出现地点：</Text>
          <Text className='character-content-row-text_a'>{character.location.name}</Text>
        </View>

        <View className='character-content-row character-content-row_two' style={{ marginTop: 16 }}>
          <Text className='character-content-row-text'>出现剧集：</Text>
        </View>

      </View>
      <View className='character-episodes'>
        {
          episodes.map(episode => (
            <Button
              className='character-episodes-btn'
              key={episode.episode}
              hoverClass='btn_active'
              hoverStyle={{ opacity: 0.6 }}
            >
              <Text className='character-episodes-btn-text'>{episode.episode + ' '}</Text>
            </Button>
          ))
        }
      </View>
      <View className='character-episodes-tip'>
        {episodes.length > 3 && <Text className='character-episodes-tip-text'>数量过多，仅显示4条</Text>}
      </View>
    </View>
  )
}

export default Wiki
