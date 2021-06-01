import React, { useState, useEffect, useCallback } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { useDispatch } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'

import { StatusBar, Loading } from "@components";
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/types'
import { updateGameSelectList } from '@actions'

import './index.less'

// choice: Dead || Alive
type selectData = {
  character: WikiCharacterType,
  correct: boolean,
}

type selectResult = {
  selected: boolean,
  correct: boolean,
}
const defaultSelectResult = {
  selected: false,
  correct: false,
}

type countdown = {
  time: number,
  counter: Function,
}
let counterTimeout: any

const Game: React.FC<any> = () => {
  const dispatch = useDispatch()
  // 三个状态：blank || loading || gaming
  const [status, setStatus] = useState<string>('blank')
  const [characters, setCharacters] = useState<WikiCharacterType[]>([])
  const [selectList, setSelectList] = useState<selectData[]>([])
  const [selectResult, setSelectResult] = useState<selectResult>(defaultSelectResult)
  const [countdown, setCountdown] = useState<countdown>({
    time: 8,
    counter: () => setTimeout(() => setCountdown(preState => ({ ...preState, time: preState.time - 1 })), 1000),
  })

  const { router: { params } } = getCurrentInstance()
  console.log(params);
  

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
      const chasAll: WikiCharacterType[] = await getCharacter(rids)
      const chas: WikiCharacterType[] = []
      for (const cha of chasAll) {
        if (chas.length > 9) {
          break
        }
        if (cha.status === 'Dead' || cha.status === 'Alive') {
          chas.push(cha)
        }
      }
      setCharacters(chas)
      setStatus('gaming')
    }

    if (status === 'loading') {
      getTenRandomCharacters()
    }

  }, [status])

  // 点击Dead或Alive按钮后的逻辑
  const handleClick = useCallback((character: WikiCharacterType, choice: string, selectList_: selectData[], characters_: WikiCharacterType[]) => {
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
        setStatus('blank')
        setCharacters([])
        setSelectList([])
        setSelectResult(defaultSelectResult)
      }
    }, 500);
  }, [dispatch])

  // 倒计时实现
  useEffect(() => {
    if (status === 'gaming') {
      clearTimeout(counterTimeout)
      if (countdown.time > 0) {
        counterTimeout = countdown.counter()
      }
      else {
        const character = characters[selectList.length]
        handleClick(character, '', selectList, characters)
      }
    }
  }, [status, countdown, characters, selectList, handleClick])


  // 未开始游戏
  if (status === 'blank') {
    return (
      <View className='game'>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <View className='game-pre-title'>
          <Text className='game-pre-title-text game-pre-title-text_red'>Dead</Text>
          <Text className='game-pre-title-text'>or</Text>
          <Text className='game-pre-title-text game-pre-title-text_green'>Alive</Text>
        </View>
        <View className='game-pre-comment'>
          <Text className='game-pre-comment-text'>判断每一个出场的角色是Dead还是Alive！</Text>
        </View>
        <Button className='game-pre-btn' onClick={() => setStatus('loading')}>开始</Button>
      </View>
    )
  }

  // 初始化游戏
  if (status === 'loading') {
    return (
      <View className='game'>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
        <Loading />
      </View>
    )
  }

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
