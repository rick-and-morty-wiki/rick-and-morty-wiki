import { UPDATE_WIKI_CHARACTER, defaultCharacter } from "@constants/wiki";
import { WikiCharacterType } from "@constants/type";

type StateType = {
  wikiCharacter: WikiCharacterType;
};

const INITIAL_STATE: StateType = {
  wikiCharacter: defaultCharacter
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WIKI_CHARACTER:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}
