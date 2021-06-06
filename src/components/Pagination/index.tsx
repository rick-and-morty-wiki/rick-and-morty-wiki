import React, { memo, useEffect, useState } from 'react'
import { View, Text, Button, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'

import { Iconfont } from '@components'

import { PaginationProps } from './type'
import './index.less'


const Pagination: React.FC<PaginationProps> = ({
  pagination,
  setPagination,
}) => {
  const [inputPages, setInputPages] = useState<string | number>(pagination.pages)

  useEffect(() => {
    setInputPages(pagination.pages)
  }, [pagination])

  // 按下回车
  const handleConfirmInputPages = () => {
    const newInputPages = parseInt(inputPages as string)
    if (newInputPages > 0 && newInputPages <= pagination.count) {
      setPagination(preState => ({ ...preState, pages: newInputPages }))
    } else {
      setInputPages(pagination.pages)
      Taro.showToast({
        title: '请输入有效的页数',
        icon: 'none',
        duration: 1000
      })
    }
  }

  const handleClickPrev = () => {
    setPagination(preState => ({ ...preState, pages: pagination.pages - 1 }))
  }

  const handleClickNext = () => {
    setPagination(preState => ({ ...preState, pages: pagination.pages + 1 }))
  }

  // count为0或undefinded
  if (!pagination.count) {
    return <View className='pagination_empty'></View>
  }

  return (
    <View className='pagination'>

      <Button
        className='pagination-btn'
        hoverClass='pagination-btn_active'
        hoverStyle={{ opacity: 0.5 }}
        onClick={handleClickPrev}
        disabled={pagination.pages <= 1}
      >
        {pagination.pages > 1 && <Iconfont name='arrow-lift' color='#ffffff' size={60} />}
      </Button>

      <View className='pagination-center'>
        <Input
          className='pagination-center-input'
          value={String(inputPages)}
          onInput={e => setInputPages(e.detail.value)}
          onConfirm={handleConfirmInputPages}
        />
        <Text className='pagination-center-count'>/ {pagination.count}</Text>
      </View>

      <Button
        className='pagination-btn'
        hoverClass='pagination-btn_active'
        hoverStyle={{ opacity: 0.5 }}
        onClick={handleClickNext}
        disabled={pagination.pages >= pagination.count}
      >
        {pagination.pages < pagination.count && <Iconfont name='arrow-right' color='#ffffff' size={60} />}
      </Button>

    </View>
  )
}

export default memo(Pagination)