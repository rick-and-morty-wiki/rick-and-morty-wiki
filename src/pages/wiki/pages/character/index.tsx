import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Image } from '@tarojs/components'

import { StatusBar, Back, Loading, CustomScrollView } from "@components";
import { CharacterType, EpisodeType, RootState } from '@constants/types'
import { defaultCharacter, defaultEpisode } from '@constants/wiki'
import { getEpisode } from '@service'
import {
  updateWikiCharacter,
  updateCharacterList_byEpisode,
  updateCharacterList_byLocation,
} from '@actions'

import EpisodeBtn from './components/EpisodeBtn'
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
      const ids: number[] = []
      for (let ei = 0; ei < character.episode.length; ei++) {
        ids.push(parseInt(character.episode[ei].split('episode/')[1]))
      }
      await getEpisode.list(ids)
        .then(data => {
          if (data && data.length > 0) {
            // 这里计算一下数量，如果length取余4不等于0或者1，则添加空btn
            const mod = data.length % 4
            if (mod !== 0 && mod !== 1) {
              for (let m = 0; m < 4 - mod; m++) {
                defaultEpisode.id = m + 999
                data.push(defaultEpisode)
              }
            }
            setEpisodes(data)
          }
        })
    }

    if (character.name && character.episode.length > 0) {
      updateEpisodes()
    }
  }, [character])



  const handleClickLocation = (location: CharacterType['location']) => {
    if (!location.url) {
      return
    }
    dispatch(updateCharacterList_byLocation(location.name, location.url))
    Taro.navigateTo({
      url: '/pages/wiki/pages/character-list/index',
    })
  }

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
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <Back className='character-back' />

      <CustomScrollView>
        <View className='character-background'>
          <Image src={character.image} className='character-background-img' mode='aspectFill' />
          <View className='character-background character-background-mask'></View>
        </View>

        <View style={{ height: statusBarHeight + 4 }}></View>
        <View className='character-header'>
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

          <View
            className='character-content-row character-content-row_two'
            style={{ marginTop: 16 }}
            onClick={() => handleClickLocation(character.origin)}
            hoverClass='btn_active'
            hoverStyle={{ opacity: 0.6 }}
          >
            <Text className='character-content-row-text'>首次出现地点：</Text>
            <Text className='character-content-row-text_a'>{character.origin.name}</Text>
          </View>

          <View
            className='character-content-row character-content-row_two'
            onClick={() => handleClickLocation(character.location)}
            hoverClass='btn_active'
            hoverStyle={{ opacity: 0.6 }}
          >
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
              <EpisodeBtn
                key={episode.episode}
                episode={episode}
                updateCharacterList_byEpisode={
                  (charactersUrl, header) => dispatch(updateCharacterList_byEpisode(charactersUrl, header))
                }
              />
            ))
          }
        </View>
      </CustomScrollView>
    </View>
  )
}

export default Wiki
