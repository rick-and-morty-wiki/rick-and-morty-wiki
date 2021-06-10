import React, { useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import DrawerLayout, {
  DrawerType,
} from 'react-native-gesture-handler/DrawerLayout';
import { StatusBar } from "@components";

import { PageContent, DrawerContent } from './components'
import './index.less'


// let Drawer: any
// if (process.env.TARO_ENV === 'rn') {
//   Drawer = require('@ant-design/react-native/lib/drawer')
// }


const AllCharacter: React.FC<any> = () => {
  const drawer = useRef() as React.MutableRefObject<DrawerLayout | null>

  if (process.env.TARO_ENV === 'rn') {
    return (
      <View className='all-character-container'>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <DrawerLayout
          ref={drawer}
          enableTrackpadTwoFingerGesture
          drawerWidth={200}
          keyboardDismissMode='on-drag'
          drawerPosition='right'
          overlayColor='#00000080'
          drawerType='slide'
          drawerBackgroundColor='#ddd'
          renderNavigationView={DrawerContent}
        >
          <PageContent drawer={drawer} />
          {/* <View>
            <Text>哈哈哈</Text>
          </View> */}
        </DrawerLayout>
      </View>
    )
  }


  return (
    <View className='all-character' >

    </View>
  )
}

export default AllCharacter
