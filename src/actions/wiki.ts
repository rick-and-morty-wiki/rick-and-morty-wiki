import { UPDATE_WIKI_CHARACTER } from '../constants/wiki'

export const updateWikiCharacter = (id) => async (dispatch) => {
  // 请求获得

  dispatch({
    type: UPDATE_WIKI_CHARACTER,
    payload: {},
  })
}

