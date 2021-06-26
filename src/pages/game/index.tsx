import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import { StatusBar, Loading } from "@components";
import { getCharacter } from '@service'
import { CharacterType } from '@constants/types'
import { GameStatus } from '@constants/game'
import { isArray } from '@utils'

import { SelectList } from './type'
import { BlankPage, GamingPage, ResultPage } from './components'
import './index.less'

const Game: React.FC<any> = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Blank)
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const [selectList, setSelectList] = useState<SelectList>([])

  // 游戏开始执行的初始化逻辑
  useEffect(() => {
    // 游戏开始，获取游戏数据的函数
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
      // 请求有问题，提示错误
      if (!isArray(chasAll)) {
        Taro.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1500
        })
        setGameStatus(GameStatus.Blank)
        return
      }
      const chas: CharacterType[] = []
      for (const cha of chasAll) {
        if (chas.length > 9) {
          break
        }
        if (cha.status === 'Dead' || cha.status === 'Alive') {
          chas.push(cha)
        }
      }
      // 第三步，更新state
      setCharacters(chas)
      setGameStatus(GameStatus.Gaming)
    }
    // 刚进入Loading状态，执行上面这个函数
    if (gameStatus === GameStatus.Loading) {
      getTenRandomCharacters()
    }
  }, [gameStatus])

  // 页面内容
  let PageContent: React.ReactNode

  // 未开始游戏
  if (gameStatus === GameStatus.Blank) {
    PageContent = (
      <BlankPage
        setGameStatus={setGameStatus}
      />
    )
  }

  // 初始化游戏中
  if (gameStatus === GameStatus.Loading) {
    PageContent = (
      <Loading />
    )
  }

  // 游戏进行中
  if (gameStatus === GameStatus.Gaming) {
    PageContent = (
      <GamingPage
        characters={characters}
        selectList={selectList}
        setSelectList={setSelectList}
        setGameStatus={setGameStatus}
      />
    )
  }

  // 游戏结果展示
  if (gameStatus === GameStatus.Result) {
    PageContent = (
      <ResultPage
        selectList={selectList}
        setCharacters={setCharacters}
        setSelectList={setSelectList}
        setGameStatus={setGameStatus}
      />
    )
  }

  return (
    <View className='game'>
      <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent />
      {PageContent}
    </View>
  )
}

export default Game
