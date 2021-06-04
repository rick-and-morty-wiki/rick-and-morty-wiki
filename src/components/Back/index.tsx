import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { StyleProp, ButtonStyle } from 'react-native'
import { Iconfont } from '@components'

import './index.less'


type BackProps = {
  onBack?: () => void,
  left?: string | number,
  top?: string | number,
  style?: StyleProp<ButtonStyle>,
  className?: string,
}


const Back: React.FC<BackProps> = ({
  onBack,
  left = 0,
  top = 0,
  style = {},
  className = '',
}) => {

  const handleClick = () => {
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack()
    }
  }

  // console.log(IconArrowLift);
  

  return (
    <Button
      className={`back-btn ${className}`}
      onClick={handleClick}
      style={{ left, top, ...style }}
      hoverClass='back-btn_active'
      hoverStyle={{ opicity: 0.5 }}
    >
      <Iconfont name='arrow-lift' size={60} />
    </Button>
  )
}

export default memo(Back)