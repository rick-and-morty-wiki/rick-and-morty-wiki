import React, { useRef } from 'react'
import { View } from '@tarojs/components'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import colors from '@style/theme'
import { CharacterFilterType } from '@constants/types'

import { PageContent, DrawerContent } from '../components'
import '../index.less'

type AllCharacterRNProps = {
  filter: CharacterFilterType,
  setFilter: Function,
}

const AllCharacterRN: React.FC<AllCharacterRNProps> = (props) => {
  const { filter, setFilter } = props
  const drawerRN = useRef() as React.MutableRefObject<DrawerLayout | null>

  return (
    <View className='all-c-container'>
      <DrawerLayout
        ref={drawerRN}
        enableTrackpadTwoFingerGesture
        drawerWidth={210}
        keyboardDismissMode='on-drag'
        drawerPosition='right'
        drawerType='back'
        overlayColor='#00000000'
        drawerBackgroundColor={colors['theme-background']}
        renderNavigationView={() => <DrawerContent filter={filter} setFilter={setFilter} />}
        contentContainerStyle={{
          elevation: 100,
          backgroundColor: '#000',
        }}
      >
        <PageContent drawerRN={drawerRN} filter={filter} />
      </DrawerLayout>
    </View>
  )

}

export default AllCharacterRN
