import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'

import { StatusBar, Loading } from "@components";
import { getCharacter } from '@service'
import { updateGameSelectList, updateGameStatus } from '@actions'
import { CharacterType, RootState, GameStatus } from '@constants/types'
import { SelectList, SelectResult, Countdown } from './type'

import './index.less'


const defaultSelectResult = {
  selected: false,
  correct: false,
}

// 计时器本器
let counterTimeout: any


const Game: React.FC<any> = () => {
  const dispatch = useDispatch()
  const gameStatus: string = useSelector((state: RootState) => state.game.gameStatus)
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [selectList, setSelectList] = useState<SelectList>([])
  const [selectResult, setSelectResult] = useState<SelectResult>(defaultSelectResult)
  const [countdown, setCountdown] = useState<Countdown>({
    time: 8,
    counter: () => setTimeout(() => setCountdown(preState => ({ ...preState, time: preState.time - 1 })), 1000),
  })

  useEffect(() => {
    // 游戏开始执行的初始化逻辑
    const getTenRandomCharacters = async () => {
      // 第一步，获取30个随机的不重复的id列表
      const rids: number[] = []
      for (let i = 0; i < 30; i++) {
        let rid: number
        do {
          rid = Math.floor(Math.random() * 671) + 1
        } while (rids.indexOf(rid) !== -1)
        rids.push(rid)
      }

      // 第二步，请求这30个id，找到10个status都不是unknown的角色
      const chasAll = await getCharacter.list(rids)
      const chas: CharacterType[] = []
      for (const cha of chasAll) {
        if (chas.length > 9) {
          break
        }
        if (cha.status === 'Dead' || cha.status === 'Alive') {
          chas.push(cha)
        }
      }
      setCharacters(chas)
      dispatch(updateGameStatus(GameStatus.Gaming))
    }

    if (gameStatus === GameStatus.Loading) {
      getTenRandomCharacters()
    }

  }, [dispatch, gameStatus])

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
        // 是最后一个，跳转到结果页，并清空当前页面的数据
        dispatch(updateGameSelectList(newSelectList))
        Taro.navigateTo({
          url: '/pages/game/pages/game-result/index',
        })
        dispatch(updateGameStatus(GameStatus.Blank))
        setCharacters([])
        setSelectList([])
        setSelectResult(defaultSelectResult)
      }
    }, 500);
  }, [dispatch])

  // 倒计时实现
  useEffect(() => {
    if (gameStatus === GameStatus.Gaming) {
      if (countdown.time > 0) {
        counterTimeout = countdown.counter()
      }
      else {
        const character = characters[selectList.length]
        handleClick(character, '', selectList, characters)
      }
    }
    // 清除
    return () => {
      clearTimeout(counterTimeout)
    }
  }, [gameStatus, countdown, characters, selectList, handleClick])


  // 未开始游戏
  if (gameStatus === GameStatus.Blank) {
    return (
      <View className='game'>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <View className='game-pre-title'>
          <Text className='game-pre-title-text game-pre-title-text_red'>Dead</Text>
          <Text className='game-pre-title-text'>or</Text>
          <Text className='game-pre-title-text game-pre-title-text_green'>Alive</Text>
        </View>
        <Button className='game-pre-btn' onClick={() => dispatch(updateGameStatus(GameStatus.Loading))}>
          <Text className='game-pre-btn-text'>开始</Text>
        </Button>
      </View>
    )
  }

  // 初始化游戏中
  if (gameStatus === GameStatus.Loading) {
    return (
      <View className='game'>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <Loading />
      </View>
    )
  }

  // 游戏进行中
  const character = characters[selectList.length]

  return (
    <View className='game'>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
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
          hoverClass='game-btns-btn_active'
          hoverStyle={{ opacity: 0.5 }}
        >
          <Text className='game-btns-btn-text'>Dead</Text>
        </Button>
        <Button
          className='game-btns-btn game-btns-btn_alive'
          disabled={selectResult.selected}
          onClick={() => handleClick(character, 'Alive', selectList, characters)}
          hoverClass='game-btns-btn_active'
          hoverStyle={{ opacity: 0.5 }}
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

export default Game
