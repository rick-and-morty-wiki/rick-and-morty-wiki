import React, { useState, useRef, useCallback, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { Pagination, Back, CustomScrollView, StatusBar, EpisodeCard } from "@components";
import { getEpisode } from '@service'
import { EpisodeType, PaginationType } from '@constants/types'

import './index.less'


const defaultPagination: PaginationType = {
  count: -1,
  pages: 1,
  cur: 1,
}

const AllEpisode: React.FC<any> = () => {
  const [episodes, setEpisodes] = useState<EpisodeType[]>([])
  const [pagination, setPagination] = useState<PaginationType>(defaultPagination)
  const [reqTrigger, setReqTrigger] = useState<boolean>(true)
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
  ) => {

    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    scrollTop()  // 触发滚到顶部
    return getEpisode.all({ page: pagination_.cur })
      .then(data => {
        const { info: { count, pages }, results } = data
        setEpisodes(results)
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

  // 控制发起请求
  useEffect(() => {
    if (reqTrigger) {
      sendRequest(pagination)
      setReqTrigger(false)
    }
  }, [reqTrigger, setReqTrigger, pagination, sendRequest])


  return (
    <View className='all-c' >
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />

      <View className='all-c-header'>
        <Back className='all-c-back' />
        <View className='all-c-header-btn'>
          <Text className='all-c-header-btn-text'>{pagination.count < 0 ? '' : pagination.count}</Text>
        </View>
      </View>

      <CustomScrollView className='all-c-scroll' ref={ScrollViewRef} >
        <View className='all-c-content'>
          {
            episodes.map(episode => (
              <EpisodeCard key={episode.episode} episode={episode} />
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

export default AllEpisode
