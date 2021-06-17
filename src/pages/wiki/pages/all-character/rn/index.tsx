import React, { useRef, useCallback } from 'react'
import { View } from '@tarojs/components'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

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
        drawerWidth={170}
        drawerPosition='right'
        drawerType='front'
        contentContainerStyle={{
          // elevation: 100,
          backgroundColor: '#000',
        }}
        renderNavigationView={() => (
          <DrawerContent
            filter={filter}
            setFilter={setFilter}
            setReqTrigger={setReqTrigger}
          />
        )}
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
