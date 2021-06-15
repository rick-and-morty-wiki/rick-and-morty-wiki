import React, { useRef, useCallback } from 'react'
import { View } from '@tarojs/components'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

import colors from '@style/theme'

import { PageContent, DrawerContent } from '../components'
import { PlatformEnterProps } from '../type'
import '../index.less'


const AllCharacterRN: React.FC<PlatformEnterProps> = (props) => {
  const { filter, setFilter, reqTrigger, setReqTrigger } = props
  const drawerRN = useRef() as React.MutableRefObject<DrawerLayout>

  const openDrawer = useCallback(() => drawerRN.current.openDrawer({ speed: 14 }), [drawerRN])
  const closeDrawer = useCallback(() => drawerRN.current.closeDrawer({ speed: 14 }), [drawerRN])

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
        renderNavigationView={() => (
          <DrawerContent
            filter={filter}
            setFilter={setFilter}
            setReqTrigger={setReqTrigger}
          />
        )}
        contentContainerStyle={{
          elevation: 100,
          backgroundColor: '#000',
        }}
      >
        <PageContent
          openDrawer={openDrawer}
          closeDrawer={closeDrawer}
          filter={filter}
          reqTrigger={reqTrigger}
          setReqTrigger={setReqTrigger}
        />
      </DrawerLayout>
    </View>
  )

}

export default AllCharacterRN
