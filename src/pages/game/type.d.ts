import { CharacterType } from '@constants/types'

// 用于selectList
export interface SelectData {
  character: CharacterType,
  correct: boolean,
}

export type SelectList = Array<SelectData>

// 用来显示当前页面的选择结果（UI上）
export interface SelectResult {
  selected: boolean,
  correct: boolean,
}

// 倒计时
export interface Countdown {
  time: number,
  counter: Function,
}
