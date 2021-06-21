import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, Text } from '@tarojs/components'

import { Back, CustomScrollView, StatusBar, CharacterCard } from "@components";
import { getCharacter } from '@service'
import { CharacterType, RootState } from '@constants/types'
import { defaultSixCharacters } from '@constants/wiki'

import './index.less'


const CharacterList: React.FC<any> = () => {
  const { charactersUrl, header } = useSelector((state: RootState) => state.wikiCharacterList)
  const [characters, setCharacters] = useState<CharacterType[]>(defaultSixCharacters)

  // 根据charactersUrl请求角色具体信息
  useEffect(() => {
    // 数据正在请求中，显示骨架屏
    if (!charactersUrl || charactersUrl.length === 0 && !header.primary) {
      setCharacters(defaultSixCharacters)
      return
    }
    // 该location内没有角色，跳过下方逻辑
    if (!charactersUrl || charactersUrl.length === 0 && header.primary) {
      setCharacters([])
      return
    }
    const ids: number[] = []
    for (const characterUrl of charactersUrl) {
      if (characterUrl) {
        ids.push(parseInt(characterUrl.split('character/')[1]))
      }
    }
    getCharacter.list(ids)
      .then(res => setCharacters(res))
  }, [charactersUrl, header.primary])

  return (
    <View className='c-list' >
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <Back className='c-list-back' />

      <CustomScrollView>
        <View className='c-list-header'>
          <Text className='c-list-header-title'>{header.title}</Text>
        </View>

        <View className='c-list-header-sub'>
          <Text className='c-list-header-primary'>{header.primary}</Text>
          <Text className='c-list-header-secondary'>{header.secondary}</Text>
        </View>

        <View className='c-list-content'>
          {
            characters.map((character, index) => (
              <CharacterCard
                key={character.id}
                character={character}
                showImage={false}
                number={index + 1}
              />
            ))
          }
        </View>
      </CustomScrollView>
    </View>
  )
}

export default CharacterList
