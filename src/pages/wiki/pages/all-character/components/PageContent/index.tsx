import React, { useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { useThrottleEffect } from 'ahooks';

import { Iconfont, CharacterCard, Pagination, Back, CustomScrollView } from "@components";
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
  const ScrollViewRef = useRef() as React.MutableRefObject<any>

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
        if (pagination.pages === 0) {
          setPagination({
            count,
            pages,
            cur: 1,
          })
        }
      })
  }, [pagination], { wait: 2500, trailing: false })

  // 点击打开Drawer
  const handleClickDrawerEnter = () => {
    drawer.current.openDrawer({ speed: 14 })
  }

  const scrollTop = () => {
    if (process.env.TARO_ENV === 'rn') {
      ScrollViewRef.current.scrollTo({ y: 0 })
    } else {
      Taro.pageScrollTo({ scrollTop: 0, selector: '.all-character' })
    }
  }


  return (
    <View className='all-character-page' >
      <Back className='all-character-back' left={42} top={42} />
      <Button className='all-character-drawer-enter' style={{ right: 42, top: 42 }} onClick={handleClickDrawerEnter}>
        <Iconfont name='sousuo' size={56} />
      </Button>
      <CustomScrollView className='all-character-scroll' ref={ScrollViewRef} >
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
          scrollTop={scrollTop}
        />
      </CustomScrollView>
    </View>
  )
}

export default AllCharacterPageContent
