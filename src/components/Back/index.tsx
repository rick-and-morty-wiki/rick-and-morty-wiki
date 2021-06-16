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
  style = {},
  className = '',
  onBack,
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
      className={`btn-circle-ab ${className}`}
      onClick={handleClick}
      style={style}
      hoverClass='btn-circle-ab_active'
      hoverStyle={{ opacity: 0.6 }}
    >
      <Iconfont name='arrow-lift' size={68} />
    </Button>
  )
}

export default memo(Back)