import React, { memo } from 'react'
import { View, Text } from '@tarojs/components'

import './index.less'

type PopBtnProps = {
  name: string,
  content?: any,
  last?: boolean,
}

const PopBtn: React.FC<PopBtnProps> = ({
  name,
  // content,
  last = false
}) => {

  const handleClick = () => {
    
  }

  return (
    <View
      className={`pop-btn ${last && 'pop-btn_last'}`}
      hoverClass='pop-btn_active'
      hoverStyle={{ opacity: 0.6 }}
      onClick={handleClick}
    >
      <Text className='pop-btn-text'>{name}</Text>
    </View>
  )
}

export default memo(PopBtn)