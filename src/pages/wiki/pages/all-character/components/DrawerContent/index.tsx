import React from 'react'
import Taro from '@tarojs/taro'
import { Button, View, Text } from '@tarojs/components'

import './index.less'


const DrawerContent: React.FC = () => {


  return (
    <View className='drawer'>
      
      <Button >
        <Text>检索</Text>
      </Button>
    </View>
  )
}

export default DrawerContent