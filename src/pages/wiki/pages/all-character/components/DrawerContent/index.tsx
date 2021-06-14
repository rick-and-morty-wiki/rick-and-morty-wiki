import React, { memo } from 'react'
import { Button, View, Text, Input, Picker } from '@tarojs/components'

import filterRange from './constant'
import { DrawerContentProps } from '../../type'
import './index.less'



const DrawerContent: React.FC<DrawerContentProps> = (props) => {
  const { filter, setFilter, setReqTrigger } = props

  const onStatusChange = (e) => {
    setFilter({ ...filter, status: filterRange.statusRange[e.detail.value] })
  }

  const onGenderChange = (e) => {
    setFilter({ ...filter, gender: filterRange.genderRange[e.detail.value] })
  }

  const onSpeciesChange = (e) => {
    setFilter({ ...filter, species: filterRange.speciesRange[e.detail.value] })
  }

  const handleFilter = () => {
    setReqTrigger({
      trigger: true,
      firstFilter: true,
    })
  }

  return (
    <View className='ac-drawer'>

      <Text className='ac-drawer-title'>名称</Text>
      <Input
        value={filter.name}
        onInput={e => setFilter({ ...filter, name: e.detail.value })}
        className='ac-drawer-item drawer-item-text'
      />

      <Text className='ac-drawer-title'>状态</Text>
      <Picker range={filterRange.statusRange} onChange={onStatusChange} value={filterRange.statusRange.indexOf(filter.status)}>
        <View className='ac-drawer-item'>
          <Text className='ac-drawer-item-text'>{filter.status === 'all' ? '全部' : filter.status}</Text>
        </View>
      </Picker>

      <Text className='ac-drawer-title'>性别</Text>
      <Picker range={filterRange.genderRange} onChange={onGenderChange} value={filterRange.genderRange.indexOf(filter.gender)}>
        <View className='ac-drawer-item'>
          <Text className='ac-drawer-item-text'>{filter.gender === 'all' ? '全部' : filter.gender}</Text>
        </View>
      </Picker>

      <Text className='ac-drawer-title'>种族</Text>
      <Picker range={filterRange.speciesRange} onChange={onSpeciesChange} value={filterRange.speciesRange.indexOf(filter.species)}>
        <View className='ac-drawer-item'>
          <Text className='ac-drawer-item-text'>{filter.species === 'all' ? '全部' : filter.species}</Text>
        </View>
      </Picker>

      <Button
        className='ac-drawer-btn'
        hoverClass='ac-drawer-btn_active'
        hoverStyle={{ opacity: 0.6 }}
        onClick={handleFilter}
      >
        <Text className='ac-drawer-btn-text'>检索</Text>
      </Button>
    </View>
  )
}

export default memo(DrawerContent)