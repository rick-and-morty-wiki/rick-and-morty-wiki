import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'

import { CustomScrollView, Iconfont } from '@components'
import { updateWikiCharacter } from '@actions'
import { GameStatus } from '@constants/game'
import { CharacterType } from '@constants/types'

import { SelectList } from '../../type'
import './index.less'

interface GameResultPageProps {
  selectList: SelectList,
  setCharacters: Function,
  setSelectList: Function,
  setGameStatus: Function
}

const GameResultPage: React.FC<GameResultPageProps> = (props) => {
  const { selectList, setCharacters, setSelectList, setGameStatus } = props
  const dispatch = useDispatch()
  const [sumData, setSumData] = useState({
    correctSum: 0,
    wrongSum: 0,
    percent: 0,
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

  const handleClickCharacter = (character: CharacterType) => {
    dispatch(updateWikiCharacter(character))
    Taro.navigateTo({
      url: `/pages/wiki/pages/character/index?id=${character.id}`,
    })
  }

  const handleClickAgain = () => {
    setCharacters([])
    setSelectList([])
    setGameStatus(GameStatus.Loading)
  }

  return (
    <View className='game-result'>
      <Button className='game-result-btn' onClick={handleClickAgain}>
        <Iconfont name='swap' size={56} />
      </Button>

      <CustomScrollView>
        <View className='game-result-content'>
          {
            selectList.map(({ character, correct }) => (
              <View key={character.id} className='game-result-content-box'>
                <Image src={character.image} className='game-result-content-img' mode='widthFix' />
                <View className='game-result-content-mask' onClick={() => handleClickCharacter(character)}>
                  <Text className={`game-result-content-text game-result-content-text_${correct ? 'correct' : 'wrong'}`}>{correct ? 'Correct' : 'Wrong'}</Text>
                </View>
              </View>
            ))
          }
        </View>

        <View className='game-result-bottom'>
          <Text className='game-result-bottom-text'>正确：</Text>
          <Text className='game-result-bottom-text game-result-bottom-text_correct'>{sumData.correctSum}&nbsp;&nbsp;&nbsp;</Text>
          <Text className='game-result-bottom-text'>错误：</Text>
          <Text className='game-result-bottom-text game-result-bottom-text_wrong'>{sumData.wrongSum}</Text>
        </View>
      </CustomScrollView>

    </View>
  )
}

export default GameResultPage
