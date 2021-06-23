import React, { memo } from 'react'
import { View, Text } from '@tarojs/components'

import './index.less'

type PopBtnProps = {
  name: string,
  content: any,
}

const PopBtn: React.FC<PopBtnProps> = ({
  name,
  // content,
}) => {

  const handleClick = () => {
    
  }

  return (
    <View
      className='pop-btn'
      hoverClass='pop-btn_active'
      hoverStyle={{ opacity: 0.6 }}
      onClick={handleClick}
    >
      <Text className='pop-btn-text'>{name}</Text>
    </View>
  )
}

export default memo(PopBtn)