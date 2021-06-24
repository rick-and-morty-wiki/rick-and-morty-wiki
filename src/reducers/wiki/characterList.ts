import {
  UPDATE_WIKI_CHARACTER_LIST,
} from "@constants/wiki";
import { CharacterListStateType } from "@constants/types";

interface StateType {
  dic: {
    [propName: string]: CharacterListStateType,
  };
};

interface ActionType {
  type: string,
  payload: CharacterListStateType,
}

const INITIAL_STATE: StateType = {
  dic: {
    '0': {
      charactersUrl: [],
      header: {
        title: '',
        primary: '',
        secondary: '',
      }
    },
  }
};

export default (state = INITIAL_STATE, action: ActionType): StateType => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WIKI_CHARACTER_LIST:
      return {
        ...state,
        dic: {
          ...state.dic,
          [payload.header.title]: payload,
        }
      };
    default:
      return state;
  }
}
