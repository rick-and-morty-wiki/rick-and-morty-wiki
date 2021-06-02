import {
  UPDATE_GAME_SELECTLIST,
  UPDATE_GAME_STATUS,
} from '@constants/game'

export const updateGameSelectList = (selectList) => ({
  type: UPDATE_GAME_SELECTLIST,
  payload: selectList,
})

export const updateGameStatus = (gameStatus) => ({
  type: UPDATE_GAME_STATUS,
  payload: gameStatus,
})
