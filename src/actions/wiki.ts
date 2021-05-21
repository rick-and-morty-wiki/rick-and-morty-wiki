import { UPDATE_WIKI_CHARACTER, defaultCharacter } from '@constants/wiki'
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/type'

export const updateWikiCharacter = (id) => async (dispatch) => {
  // 先清空之前的数据
  dispatch({
    type: UPDATE_WIKI_CHARACTER,
    payload: defaultCharacter,
  })
  // 请求获得新数据
  const character: WikiCharacterType = await getCharacter(id)
  if (character) {
    dispatch({
      type: UPDATE_WIKI_CHARACTER,
      payload: character,
    })
  }
}
