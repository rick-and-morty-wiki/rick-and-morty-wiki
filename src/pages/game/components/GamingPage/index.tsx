import React, { useState, useEffect, useCallback } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'

import { CharacterType } from '@constants/types'
import { GameStatus } from '@constants/game'
import { useCountDown } from '@hooks'

import { SelectList, SelectResult } from '../../type'
import './index.less'

interface GamingPageProps {
  characters: CharacterType[],
  selectList: SelectList,
  setSelectList: Function,
  setGameStatus: Function
}

const defaultSelectResult = {
  selected: false,
  correct: false,
}

const GamingPage: React.FC<GamingPageProps> = (props) => {
  const { characters, selectList, setSelectList, setGameStatus } = props
  const [selectResult, setSelectResult] = useState<SelectResult>(defaultSelectResult)
  const [countDown, refreshCountDown] = useCountDown(8)

  const character = characters[selectList.length]

  // 点击Dead或Alive按钮后的逻辑
  const handleClick = useCallback((
    choice: string,
  ) => {
    const correct = character.status === choice
    setSelectResult({
      selected: true,
      correct,
    })
    // 这个timeout让页面停顿0.5秒
    setTimeout(() => {
      // 重置倒计时
      refreshCountDown()
      // 更新state
      const newSelectList = [...selectList, {
        character,
        correct,
      }]
      if (selectList.length !== characters.length - 1) {
        // 不是最后一个，更新本页面数据
        setTimeout(() => {
          setSelectResult(defaultSelectResult)
          setSelectList(newSelectList)
        })
      } else {
        // 是最后一个，跳转到结果页
        setGameStatus(GameStatus.Result)
        setSelectList(newSelectList)
      }
    }, 500);
  }, [character, selectList, characters, setSelectList, setGameStatus, refreshCountDown])

  // 倒计时结束，强制选错
  useEffect(() => {
    if (countDown.time === 0) {
      handleClick('')
    }
  }, [character, countDown, handleClick])

  return (
    <View className='game'>
      <View className='game-countdown'>
        <Text className='game-countdown-text'>{countDown.time}</Text>
      </View>
      <View className='game-img'>
        {selectResult.selected &&
          <View className='game-img-mask'>
            <Text className={`game-img-mask-text game-img-mask-text_${selectResult.correct ? 'correct' : 'wrong'}`}>
              {selectResult.correct ? 'Correct' : 'Wrong'}
            </Text>
          </View>}
        <Image src={character.image} className={`game-img-value game-img-value_${selectResult.selected && 'grey'}`} mode='widthFix' />
      </View>
      <View className='game-name'>
        <Text className='game-name-text'>{character.name}</Text>
      </View>
      <View className='game-location'>
        <Text className='game-location-text'>{character.location.name}</Text>
      </View>
      <View className='game-btns'>
        <Button
          className='game-btns-btn game-btns-btn_dead'
          disabled={selectResult.selected}
          onClick={() => handleClick('Dead')}
          hoverClass='btn_active'
          hoverStyle={{ opacity: 0.6 }}
        >
          <Text className='game-btns-btn-text'>Dead</Text>
        </Button>
        <Button
          className='game-btns-btn game-btns-btn_alive'
          disabled={selectResult.selected}
          onClick={() => handleClick('Alive')}
          hoverClass='btn_active'
          hoverStyle={{ opacity: 0.6 }}
        >
          <Text className='game-btns-btn-text'>Alive</Text>
        </Button>
      </View>
      <View className='game-count'>
        <Text className='game-count-text'>{`${selectList.length + 1} / ${characters.length}`}</Text>
      </View>
    </View>
  )
}

export default GamingPage
