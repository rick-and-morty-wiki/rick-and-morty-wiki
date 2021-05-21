import { UPDATE_WIKI_CHARACTER } from '@constants/wiki'
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/type'

export const updateWikiCharacter = (id) => async (dispatch) => {
  // 请求获得
  const character: WikiCharacterType = await getCharacter(id)

  dispatch({
    type: UPDATE_WIKI_CHARACTER,
    payload: character,
  })
}

