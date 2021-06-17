import React, { useState, useEffect, useCallback } from 'react'
import { View, Button, Text, Image } from '@tarojs/components'

import { CharacterType } from '@constants/types'
import { GameStatus } from '@constants/game'

import { SelectList, SelectResult, Countdown } from '../../type'
import './index.less'

interface GamingPageProps {
  characters: CharacterType[],
  selectList: SelectList,
  setSelectList: Function,
  setGameStatus: Function
}

// 计时器本器
let counterTimeout: any

const defaultSelectResult = {
  selected: false,
  correct: false,
}

const GamingPage: React.FC<GamingPageProps> = (props) => {
  const { characters, selectList, setSelectList, setGameStatus } = props
  const [selectResult, setSelectResult] = useState<SelectResult>(defaultSelectResult)
  const [countdown, setCountdown] = useState<Countdown>({
    time: 8,
    counter: () => setTimeout(() => setCountdown(preState => ({ ...preState, time: preState.time - 1 })), 1000),
  })

  // 点击Dead或Alive按钮后的逻辑
  const handleClick = useCallback((character: CharacterType, choice: string, selectList_: SelectList, characters_: CharacterType[]) => {
    const correct = character.status === choice
    setSelectResult({
      selected: true,
      correct,
    })
    setTimeout(() => {
      // 重载计时器
      clearTimeout(counterTimeout)
      setCountdown(preState => ({ ...preState, time: 8 }))
      const newSelectList = [...selectList_, {
        character,
        correct,
      }]
      if (selectList_.length !== characters_.length - 1) {
        // 不是最后一个，更新本页面数据
        setTimeout(() => {
          setSelectResult(defaultSelectResult)
          setSelectList(newSelectList)
        })
      } else {
        // 是最后一个，跳转到结果页
        setGameStatus(GameStatus.Result)
        setSelectList(newSelectList)
        setSelectResult(defaultSelectResult)
      }
    }, 500);
  }, [setSelectList, setGameStatus])


  // 倒计时实现
  useEffect(() => {
    if (countdown.time > 0) {
      counterTimeout = countdown.counter()
    }
    else {
      const character = characters[selectList.length]
      handleClick(character, '', selectList, characters)
    }
    // 清除
    return () => {
      clearTimeout(counterTimeout)
    }
  }, [countdown, characters, selectList, handleClick])

  const character = characters[selectList.length]

  return (
    <View className='game'>
      <View className='game-countdown'>
        <Text className='game-countdown-text'>{countdown.time}</Text>
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
          onClick={() => handleClick(character, 'Dead', selectList, characters)}
          hoverClass='btn_active'
          hoverStyle={{ opacity: 0.6 }}
        >
          <Text className='game-btns-btn-text'>Dead</Text>
        </Button>
        <Button
          className='game-btns-btn game-btns-btn_alive'
          disabled={selectResult.selected}
          onClick={() => handleClick(character, 'Alive', selectList, characters)}
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
