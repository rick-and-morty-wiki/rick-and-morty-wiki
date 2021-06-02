import React from 'react'
import Taro from '@tarojs/taro'
import { Button, ButtonProps } from '@tarojs/components'
import { StyleProp, ButtonStyle } from 'react-native'

import './index.less'

type BackProps = {
  onBack?: () => void,
  style: StyleProp<ButtonStyle>,

}

const Back: React.FC<BackProps> = ({ onBack }) => {

  const handleClick = () => {
    if (onBack) {
      onBack()
    } else {
      Taro.navigateBack()
    }
  }

  return (
    <Button className='back-btn' onClick={handleClick}></Button>
  )
}

export default Back