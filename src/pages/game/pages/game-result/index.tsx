import React, { useState, useEffect } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'

import { StatusBar, Back, CustomScrollView } from "@components";
import { updateWikiCharacter, updateGameStatus } from '@actions'
import { GameSelectList, RootState } from '@constants/types'
import { GameStatus } from '@constants/game'

import './index.less'


const Game: React.FC<any> = () => {
  const dispatch = useDispatch()
  const selectList: GameSelectList = useSelector((state: RootState) => state.game.selectList)
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0)
  const [sumData, setSumData] = useState({
    correctSum: 0,
    wrongSum: 0,
    percent: 0,
  })

  // 获取导航栏高度
  useDidShow(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  })

  useEffect(() => {
    if (!selectList || selectList.length === 0) {
      return
    }
    let correctSum: number = 0
    let wrongSum: number = 0
    for (const { correct } of selectList) {
      if (correct) {
        correctSum += 1
      } else {
        wrongSum += 1
      }
    }
    const percent = correctSum === 10 ? 100 : (correctSum * 10 + (Math.random() - 1) * 5)
    setSumData({
      correctSum,
      wrongSum,
      percent,
    })
  }, [selectList])

  const handleClickCharacter = (character) => {
    dispatch(updateWikiCharacter(character))
    Taro.navigateTo({
      url: '/pages/wiki/pages/character/index',
    })
  }

  const handleClickBack = () => {
    dispatch(updateGameStatus(GameStatus.Loading))
    Taro.navigateBack()
  }

  return (
    <View className='gameResult'>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
      <Back className='gameResult-back' />

      <CustomScrollView>
      <View className='gameResult-header'>
        <Text className='gameResult-header-title'>Game Over</Text>
        <View className='gameResult-header-score'>
          <Text className='gameResult-header-text'>正确：</Text>
          <Text className='gameResult-header-text gameResult-header-text_correct'>{sumData.correctSum}&nbsp;&nbsp;&nbsp;</Text>
          <Text className='gameResult-header-text'>错误：</Text>
          <Text className='gameResult-header-text gameResult-header-text_wrong'>{sumData.wrongSum}</Text>
        </View>
        <Text className='gameResult-header-comment'>超越了全球{sumData.percent.toFixed(2)}%的人</Text>
        <Button className='gameResult-header-btn' onClick={handleClickBack}>
          <Text className='gameResult-header-btn-text'>再来一局</Text>
        </Button>
      </View>

      <View className='gameResult-content'>
        {
          selectList.map(({ character, correct }) => (
            <View key={character.id} className='gameResult-content-box'>
              <Image src={character.image} className='gameResult-content-img' mode='widthFix' />
              <View className='gameResult-content-mask' onClick={() => handleClickCharacter(character)}>
                <Text className={`gameResult-content-text gameResult-content-text_${correct ? 'correct' : 'wrong'}`}>{correct ? 'Correct' : 'Wrong'}</Text>
              </View>
            </View>
          ))
        }
      </View>
      </CustomScrollView>
    </View>
  )
}

export default Game
