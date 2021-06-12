import { CharacterType } from './wiki'

// 三个状态：blank（未开始游戏） | loading（游戏正在加载） | gaming（游戏中）
export enum GameStatus {
  Blank = 'blank',
  Loading = 'loading',
  Gaming = 'gaming'
}

export type GameSelectList = Array<{
  character: CharacterType,
  correct: boolean,
}>
