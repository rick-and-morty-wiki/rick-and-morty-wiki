import { UPDATE_WIKI_CHARACTER } from "../../constants/wiki";
import { WikiCharacterType } from "../../constants/type";

type StateType = {
  wikiCharacter: WikiCharacterType;
};

const INITIAL_STATE: StateType = {
  wikiCharacter: {
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: {
      name: "",
      url: ""
    },
    location: {
      name: "",
      url: ""
    },
    image: "",
    episode: [""],
    url: ""
  }
};

export default function wiki(state = INITIAL_STATE, action) {
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
