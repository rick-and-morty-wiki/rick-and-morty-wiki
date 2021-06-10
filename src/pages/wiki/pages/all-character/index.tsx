import React, { useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import DrawerLayout, {
  DrawerType,
} from 'react-native-gesture-handler/DrawerLayout';
import { StatusBar } from "@components";
import colors from '@style/theme'

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
        <StatusBar barStyle='light-content' backgroundColor={colors['theme-background']} translucent />
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
          contentContainerStyle={{ elevation: 100 }}
        >
          <PageContent drawer={drawer} />
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
