import React, { useEffect, useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import { StatusBar, CharacterCard, Pagination } from "@components";
import { getCharacter } from '@service'
import { CharacterType, PaginationType } from '@constants/types'
import { defaultRandomCharacters } from '@constants/wiki'

import './index.less'


const Wiki: React.FC<any> = () => {
  // const [characters, setCharacters] = useState<CharacterType[]>(defaultRandomCharacters)
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [pagination, setPagination] = useState<PaginationType>({
    count: 0,
    pages: 0,
    cur: 0,
  })

  useEffect(() => {
    // 刚进入页面的时候
    if (pagination.count === 0) {
      getCharacter.all()
      .then(data => {
        console.log(data.info.count);
        
      })
    }
  }, [pagination])


  return (
    <View className='all-character' >
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <View className='all-character-header'>

      </View>

      <View className='all-character-content'>
        {
          characters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))
        }
      </View>

      <Pagination
        pagination={pagination}
        setPagination={setPagination}
      />
    </View>
  )
}

export default Wiki
