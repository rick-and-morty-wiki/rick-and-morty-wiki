import { UPDATE_WIKI_CHARACTER, defaultCharacter } from "@constants/wiki";
import { WikiCharacterType } from "@constants/type";

type StateType = {
  character: WikiCharacterType;
};

const INITIAL_STATE: StateType = {
  character: defaultCharacter
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WIKI_CHARACTER:
      return {
        ...state,
        character: {
          ...state.character,
          ...payload,
        }
      };
    default:
      return state;
  }
}
