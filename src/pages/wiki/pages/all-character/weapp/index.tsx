import React, { useState } from 'react'
import { View } from '@tarojs/components'

import { CharacterFilterType } from '@constants/types'

import { PageContent, DrawerContent } from '../components'
import '../index.less'

type AllCharacterRNProps = {
  filter: CharacterFilterType,
  setFilter: Function,
}

const AllCharacterRN: React.FC<AllCharacterRNProps> = (props) => {
  const { filter, setFilter } = props
  const [drawerWE, setDrawerWE] = useState<boolean>(false)

  return (
    <View className='all-c-container'>
      <PageContent filter={filter} />
    </View>
  )

}

export default AllCharacterRN
