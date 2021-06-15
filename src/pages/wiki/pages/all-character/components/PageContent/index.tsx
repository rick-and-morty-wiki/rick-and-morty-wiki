import React, { useState, useRef, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import { Iconfont, CharacterCard, Pagination, Back, CustomScrollView, StatusBar } from "@components";
import { getCharacter } from '@service'
import { CharacterType, PaginationType, CharacterFilterType } from '@constants/types'
import { defaultRandomCharacters } from '@constants/wiki'
import { formatFilter } from '@utils'

import { AllCharacterPageContentProps, DrawerRNType } from '../../type'
import '../../index.less'


const defaultPagination: PaginationType = {
  count: -1,
  pages: 1,
  cur: 1,
}

const AllCharacterPageContent: React.FC<AllCharacterPageContentProps> = (props) => {
  const { drawerRN, setDrawerWE, filter, reqTrigger, setReqTrigger } = props
  const [characters, setCharacters] = useState<CharacterType[]>(defaultRandomCharacters)
  const [pagination, setPagination] = useState<PaginationType>(defaultPagination)
  const ScrollViewRef = useRef() as React.MutableRefObject<any>

  // 滚到顶部
  const scrollTop = useCallback(() => {
    if (process.env.TARO_ENV === 'rn') {
      ScrollViewRef.current.scrollTo({ y: 0 })
    } else {
      // 直接操控TaroElement，实现滚动到顶部。ref.current返回的就是一个TaroElement
      ScrollViewRef.current.setAttribute('scrollTop', 0)
    }
  }, [ScrollViewRef])

  // 触发请求
  const sendRequest = useCallback((
    pagination_: PaginationType,
    filter_: CharacterFilterType,
  ) => {

    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    scrollTop()  // 触发滚到顶部
    return getCharacter.filt({ 
      ...formatFilter<CharacterFilterType>(filter_),
      page: pagination_.cur
     })
      .then(data => {
        const { info: { count, pages }, results } = data
        setCharacters(results as Array<CharacterType>)
        Taro.hideLoading()
        if (pagination_.count === -1) {
          setPagination({
            count,
            pages,
            cur: 1,
          })
        }
      })
  }, [scrollTop])

  // 控制什么时候发起请求
  // reqTrigger.trigger === true: 立即触发请求
  // reqTrigger.firstFilter === true: 点击“检索”，需重置pagination
  useEffect(() => {
    if (reqTrigger.trigger) {
      if (reqTrigger.firstFilter) {
        sendRequest(defaultPagination, filter)
      } else {
        sendRequest(pagination, filter)
      }
      setReqTrigger({
        trigger: false,
        firstFilter: false
      })
    }
  }, [reqTrigger, setReqTrigger, pagination, filter, sendRequest])

  // 点击打开Drawer
  const handleClickDrawerEnter = () => {
    if (process.env.TARO_ENV === 'rn') {
      (drawerRN as DrawerRNType).current.openDrawer({ speed: 14 })
    } else {
      (setDrawerWE as Function)(true)
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
          setReqTrigger={setReqTrigger}
        />
      </CustomScrollView>
    </View>
  )
}

export default AllCharacterPageContent
