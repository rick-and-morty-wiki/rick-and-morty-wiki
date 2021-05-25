import React, { useState } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { StatusBar,  CustomScrollView } from "@components";

// import './index.less'



const Wiki: React.FC<any> = () => {
  const [gaming, setGaming] = useState<boolean>(false)

  // 未开始游戏
  if (!gaming) {
    return (
      <View className='game'>
        <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
      </View>
    )
  }

  return (
    <View className='game'>
      <StatusBar barStyle='dark-content' backgroundColor='rgba(0,0,0,0)' translucent />
    </View>
  )
}

export default Wiki
