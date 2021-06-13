import React, { useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { useThrottleEffect } from 'ahooks';

import { Iconfont, CharacterCard, Pagination, Back, CustomScrollView, StatusBar } from "@components";
import { getCharacter } from '@service'
import { CharacterType, PaginationType, CharacterFilterType } from '@constants/types'
import { defaultRandomCharacters } from '@constants/wiki'

import '../../index.less'


interface AllCharacterPageContentProps {
  drawerRN?: any,
  setDrawerWE?: Function,
  filter: CharacterFilterType,
}

const AllCharacterPageContent: React.FC<AllCharacterPageContentProps> = (props) => {
  const { drawerRN, setDrawerWE } = props
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
    if (process.env.TARO_ENV === 'rn') {
      drawerRN.current.openDrawer({ speed: 14 })
    } else {
      (setDrawerWE as Function)(true)
    }
  }

  // 滚到顶部
  const scrollTop = () => {
    if (process.env.TARO_ENV === 'rn') {
      ScrollViewRef.current.scrollTo({ y: 0 })
    } else {
      // 直接操控TaroElement，实现滚动到顶部。ref.current返回的就是一个TaroElement
      ScrollViewRef.current.setAttribute('scrollTop', 0)
    }
  }


  return (
    <View className='all-c-page' id='all-c-page' >
      <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <Back className='all-c-back' left={42} top={42} />
      <Button
        className='all-c-drawer-enter'
        style={{ left: 120, top: 42 }}
        onClick={handleClickDrawerEnter}
        hoverClass='all-c-drawer-enter_active'
        hoverStyle={{ opacity: 0.6 }}
      >
        <Iconfont name='sousuo' size={56} />
      </Button>
      <CustomScrollView className='all-c-scroll' ref={ScrollViewRef} >
        <View className='all-c-content'>
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
