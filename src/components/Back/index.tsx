import React, { memo } from 'react'
import Taro from '@tarojs/taro'
import { Button } from '@tarojs/components'
import { StyleProp, ButtonStyle } from 'react-native'

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

  return (
    <Button
      className={`back-btn ${className}`}
      onClick={handleClick}
      style={{ left, top, ...style }}
    ></Button>
  )
}

export default memo(Back)