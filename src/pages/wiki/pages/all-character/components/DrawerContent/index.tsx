import React, { memo } from 'react'
import { Button, View, Text, Input, Picker } from '@tarojs/components'

import { Iconfont } from '@components'
import { defaultCharacterFilter } from '@constants/wiki'

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

  const handleRefreshFilter = () => {
    setFilter(defaultCharacterFilter)
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
        className='ac-drawer-item ac-drawer-item-text'
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

      <View className='ac-drawer-bottom'>
        <Button
          className='ac-drawer-refresh'
          hoverClass='btn_active'
          hoverStyle={{ opacity: 0.6 }}
          onClick={handleRefreshFilter}
        >
          <Iconfont name='swap' size={48} />
        </Button>
        <Button
          className='ac-drawer-search'
          hoverClass='btn_active'
          hoverStyle={{ opacity: 0.6 }}
          onClick={handleFilter}
        >
          <Text className='ac-drawer-search-text'>检索</Text>
        </Button>
      </View>

    </View>
  )
}

export default memo(DrawerContent)