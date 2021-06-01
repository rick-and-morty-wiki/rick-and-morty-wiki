import { UPDATE_GAME_SELECTLIST } from '@constants/game'

export const updateGameSelectList = (selectList) => ({
  type: UPDATE_GAME_SELECTLIST,
  payload: selectList,
})
