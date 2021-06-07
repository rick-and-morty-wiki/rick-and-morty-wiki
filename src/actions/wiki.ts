import { UPDATE_WIKI_CHARACTER } from '@constants/wiki'
import { getCharacter } from '@service'
import { CharacterType } from '@constants/types'

export const updateWikiCharacter = (character: CharacterType) => async (dispatch) => {
  dispatch({
    type: UPDATE_WIKI_CHARACTER,
    payload: character,
  })
  if (!character.name) {
    // 请求获得新数据
    const character_ = await getCharacter.one(character.id)
    dispatch({
      type: UPDATE_WIKI_CHARACTER,
      payload: character_,
    })
  }
}
