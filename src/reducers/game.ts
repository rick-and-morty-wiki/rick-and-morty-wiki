import {
  UPDATE_GAME_SELECTLIST,
  UPDATE_GAME_STATUS,
} from "@constants/game";
import { GameSelectList, GameStatus } from "@constants/types";


type StateType = {
  selectList: GameSelectList,
  gameStatus: GameStatus,
};

const INITIAL_STATE: StateType = {
  selectList: [],
  gameStatus: GameStatus.Blank,
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_GAME_SELECTLIST:
      return {
        ...state,
        selectList: payload,
      };

    case UPDATE_GAME_STATUS:
      return {
        ...state,
        gameStatus: payload,
      };
    default:
      return state;
  }
}
