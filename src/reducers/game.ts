import { UPDATE_GAME_SELECTLIST } from "@constants/game";
import { GameSelectList } from "@constants/types";

type StateType = {
  selectList: GameSelectList;
};

const INITIAL_STATE: StateType = {
  selectList: []
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_GAME_SELECTLIST:
      return {
        ...state,
        selectList: payload,
      };
    default:
      return state;
  }
}
