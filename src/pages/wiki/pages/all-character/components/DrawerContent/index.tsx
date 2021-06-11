import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { Button, View, Text, Input } from '@tarojs/components'

import { CharacterFilterType } from '@constants/types'

import './index.less'

type DrawerContentProps = {
  filter: CharacterFilterType,
  setFilterL: Function,
}

const DrawerContent: React.FC<DrawerContentProps> = (props) => {
  const { filter, setFilterL } = props

  return (
    <View className='drawer'>

      <Text className='drawer-title'>名称</Text>
      <Input
        value={filter.name}
        onInput={e => setFilterL({ ...filter, name: e.detail.value })}
        className='drawer-item'
      />

      <Text className='drawer-title'>状态</Text>
      <View className='drawer-item'>
        <Text className='drawer-item-text'>{filter.status}</Text>
      </View>

      <Text className='drawer-title'>性别</Text>
      <View className='drawer-item'>
        <Text className='drawer-item-text'>{filter.gender}</Text>
      </View>

      <Text className='drawer-title'>种族</Text>
      <View className='drawer-item'>
        <Text className='drawer-item-text'>{filter.species}</Text>
      </View>

      <Button
        className='drawer-btn'
        hoverClass='drawer-btn_avtive'
        hoverStyle={{ opacity: 0.5 }}
      >
        <Text className='drawer-btn-text'>检索</Text>
      </Button>
    </View>
  )
}

export default DrawerContent