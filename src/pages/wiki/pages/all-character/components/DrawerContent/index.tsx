import React, { memo } from 'react'
import { Button, View, Text, Input, Picker } from '@tarojs/components'

import { CharacterFilterType } from '@constants/types'

import filterRange from './constant'
import './index.less'

type DrawerContentProps = {
  filter: CharacterFilterType,
  setFilter: Function,
}

const DrawerContent: React.FC<DrawerContentProps> = (props) => {
  const { filter, setFilter } = props

  const onStatusChange = (e) => {
    setFilter({ ...filter, status: filterRange.statusRange[e.detail.value] })
  }

  const onGenderChange = (e) => {
    setFilter({ ...filter, gender: filterRange.genderRange[e.detail.value] })
  }

  const onSpeciesChange = (e) => {
    setFilter({ ...filter, species: filterRange.speciesRange[e.detail.value] })
  }

  return (
    <View className='drawer'>

      <Text className='drawer-title'>名称</Text>
      <Input
        value={filter.name}
        onInput={e => setFilter({ ...filter, name: e.detail.value })}
        className='drawer-item drawer-item-text'
      />

      <Text className='drawer-title'>状态</Text>
      <Picker range={filterRange.statusRange} onChange={onStatusChange} value={filterRange.statusRange.indexOf(filter.status)}>
        <View className='drawer-item'>
          <Text className='drawer-item-text'>{filter.status === 'all' ? '全部' : filter.status}</Text>
        </View>
      </Picker>

      <Text className='drawer-title'>性别</Text>
      <Picker range={filterRange.genderRange} onChange={onGenderChange} value={filterRange.genderRange.indexOf(filter.gender)}>
        <View className='drawer-item'>
          <Text className='drawer-item-text'>{filter.gender === 'all' ? '全部' : filter.gender}</Text>
        </View>
      </Picker>

      <Text className='drawer-title'>种族</Text>
      <Picker range={filterRange.speciesRange} onChange={onSpeciesChange} value={filterRange.speciesRange.indexOf(filter.species)}>
        <View className='drawer-item'>
          <Text className='drawer-item-text'>{filter.species === 'all' ? '全部' : filter.species}</Text>
        </View>
      </Picker>

      <Button
        className='drawer-btn'
        hoverClass='drawer-btn_avtive'
        hoverStyle={{ opacity: 0.6 }}
      >
        <Text className='drawer-btn-text'>检索</Text>
      </Button>
    </View>
  )
}

export default memo(DrawerContent)