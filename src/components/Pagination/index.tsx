import React, { memo, useEffect, useState } from 'react'
import { View, Text, Button, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { Iconfont } from '@components'

import { PaginationProps } from './type'
import './index.less'


const Pagination: React.FC<PaginationProps> = ({
  pagination,
  setPagination,
  scrollTop,
  setReqTrigger,
}) => {
  const [inputCur, setInputCur] = useState<string | number>(pagination.cur)

  useEffect(() => {
    setInputCur(pagination.cur)
  }, [pagination])

  // 滚到顶部
  const scrollTop_ = () => {
    if (scrollTop) {
      scrollTop()
    }
  }

  // 触发查询
  const request = () => {
    if (setReqTrigger) {
      setReqTrigger({
        trigger: true,
        firstFilter: false
      })
    }
  }

  // 按下回车
  const handleConfirmInputPages = () => {
    const newInputCur = parseInt(inputCur as string)
    if (newInputCur > 0 && newInputCur <= pagination.pages) {
      scrollTop_()
      setPagination(preState => ({ ...preState, cur: newInputCur }))
      request()
    } else {
      setInputCur(pagination.cur)
      Taro.showToast({
        title: '请输入有效的页数',
        icon: 'none',
        duration: 1000
      })
    }
  }

  const handleClickPrev = () => {
    scrollTop_()
    setPagination(preState => ({ ...preState, cur: pagination.cur - 1 }))
    request()
  }

  const handleClickNext = () => {
    scrollTop_()
    setPagination(preState => ({ ...preState, cur: pagination.cur + 1 }))
    request()
  }

  // count为0或undefinded
  if (pagination.pages <= 1 || pagination.count <= 0) {
    return <View className='pagination_empty'></View>
  }

  return (
    <View className='pagination'>

      <Button
        className='pagination-btn'
        hoverClass='btn_active'
        hoverStyle={{ opacity: 0.6 }}
        onClick={handleClickPrev}
        disabled={pagination.cur <= 1}
      >
        {pagination.cur > 1 && <Iconfont name='arrow-lift' color='#ffffff' size={60} />}
      </Button>

      <View className='pagination-center'>
        <Input
          className='pagination-center-input'
          value={String(inputCur)}
          onInput={e => setInputCur(e.detail.value)}
          onConfirm={handleConfirmInputPages}
        />
        <Text className='pagination-center-count'>/ {pagination.pages}</Text>
      </View>

      <Button
        className='pagination-btn'
        hoverClass='btn_active'
        hoverStyle={{ opacity: 0.6 }}
        onClick={handleClickNext}
        disabled={pagination.cur >= pagination.pages}
      >
        {pagination.cur < pagination.pages && <Iconfont name='arrow-right' color='#ffffff' size={60} />}
      </Button>

    </View>
  )
}

export default memo(Pagination)