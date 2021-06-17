import React from 'react'
import { View, Button, Text } from '@tarojs/components'

import { GameStatus } from '@constants/game'

import './index.less'

interface GameBlankPageProps {
  setGameStatus: Function
}

const GameBlankPage: React.FC<GameBlankPageProps> = (props) => {
  const { setGameStatus } = props

  return (
    <View className='game'>
      <View className='game-pre-title'>
        <Text className='game-pre-title-text game-pre-title-text_red'>Dead</Text>
        <Text className='game-pre-title-text'>or</Text>
        <Text className='game-pre-title-text game-pre-title-text_green'>Alive</Text>
      </View>
      <Button className='game-pre-btn' onClick={() => setGameStatus(GameStatus.Loading)}>
        <Text className='game-pre-btn-text'>开始</Text>
      </Button>
    </View>
  )
}

export default GameBlankPage
