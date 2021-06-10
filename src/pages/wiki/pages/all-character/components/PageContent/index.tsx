import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { useThrottleEffect } from 'ahooks';

import { StatusBar, CharacterCard, Pagination, Back, CustomScrollView } from "@components";
import { getCharacter } from '@service'
import { CharacterType, PaginationType } from '@constants/types'
import { defaultRandomCharacters } from '@constants/wiki'

import '../../index.less'


interface AllCharacterPageContentProps {
  drawer: any
}

const AllCharacterPageContent: React.FC<AllCharacterPageContentProps> = (props) => {
  const { drawer } = props
  const [characters, setCharacters] = useState<CharacterType[]>(defaultRandomCharacters)
  const [pagination, setPagination] = useState<PaginationType>({
    count: 0,
    pages: 0,
    cur: 1,
  })

  useThrottleEffect(() => {
    // setScrollTop(0)
    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    getCharacter.all({ page: pagination.cur })
      .then(data => {
        const { info: { count, pages }, results } = data
        setCharacters(results)
        Taro.hideLoading()
        Taro.pageScrollTo({ scrollTop: 0, selector: '.all-character' })
        if (pagination.pages === 0) {
          setPagination({
            count,
            pages,
            cur: 1,
          })
        }
      })
  }, [pagination], { wait: 2500, trailing: false })


  const handleClickDrawerEnter = () => {
    console.log('111111');
    drawer.current.openDrawer({ speed: 14 })
  }


  return (
    <View className='all-character-page' >
      <Back className='all-character-back' left={42} top={42} />
      <Button className='all-character-drawer-enter' style={{ left: 42, top: 42 }} onClick={handleClickDrawerEnter}>打开</Button>
      <CustomScrollView className='all-character-scroll' scrollY>
        
        <View className='all-character-header'>

        </View>

        <View className='all-character-content'>
          {
            characters.map(character => (
              <CharacterCard key={character.id} character={character} showImage={false} />
            ))
          }
        </View>

        <Pagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </CustomScrollView>
      
    </View>
  )
}

export default AllCharacterPageContent
