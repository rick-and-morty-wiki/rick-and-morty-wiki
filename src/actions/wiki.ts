import { UPDATE_WIKI_CHARACTER } from '@constants/wiki'
import { getCharacter } from '@service'
import { WikiCharacterType } from '@constants/types'

export const updateWikiCharacter = (character: WikiCharacterType) => async (dispatch) => {
  dispatch({
    type: UPDATE_WIKI_CHARACTER,
    payload: character,
  })
  if (!character.name) {
    // 请求获得新数据
    const character_: WikiCharacterType = await getCharacter(character.id)
    dispatch({
      type: UPDATE_WIKI_CHARACTER,
      payload: character_,
    })
  }
}
