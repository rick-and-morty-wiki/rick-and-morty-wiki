import {
  UPDATE_WIKI_CHARACTER_LIST,
  defaultSixCharacters,
} from "@constants/wiki";
import { CharacterListStateType } from "@constants/types";


const INITIAL_STATE: CharacterListStateType = {
  charactersUrl: [''],
  header: {
    title: '',
    primary: '',
    secondary: '',
  }
};

export default (state = INITIAL_STATE, action): CharacterListStateType => {
  const { payload } = action;

  switch (action.type) {
    case UPDATE_WIKI_CHARACTER_LIST:
      return {
        charactersUrl: [...payload.charactersUrl],
        header: { ...payload.header }
      };
    default:
      return state;
  }
}
