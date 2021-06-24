import {
  UPDATE_WIKI_CHARACTER,
  defaultCharacter,
} from "@constants/wiki";
import { CharacterType } from "@constants/types";

interface StateType {
  characterDic: {
    [propName: string]: CharacterType,
  };
};

interface ActionType {
  type: string,
  payload: CharacterType,
}

const INITIAL_STATE: StateType = {
  characterDic: {
    '0': defaultCharacter,
  }
};

export default (state = INITIAL_STATE, action: ActionType): StateType => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WIKI_CHARACTER:
      return {
        characterDic: {
          ...state.characterDic,
          [payload.id]: payload,
        }
      };
    default:
      return state;
  }
}
