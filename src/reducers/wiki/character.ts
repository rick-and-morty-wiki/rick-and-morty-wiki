import {
  UPDATE_WIKI_CHARACTER,
  defaultCharacter,
} from "@constants/wiki";
import { CharacterType } from "@constants/types";

type StateType = {
  character: CharacterType;
};

const INITIAL_STATE: StateType = {
  character: defaultCharacter
};

export default (state = INITIAL_STATE, action): StateType => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WIKI_CHARACTER:
      return {
        character: { ...payload }
      };
    default:
      return state;
  }
}
