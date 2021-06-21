import {
  UPDATE_WIKI_CHARACTER,
  UPDATE_WIKI_CHARACTER_LIST,
} from '@constants/wiki'
import { getCharacter, getLocation } from '@service'
import { CharacterType, CharacterListStateType } from '@constants/types'

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

// 点击某一个剧集，跳转到character-list页面
export const updateCharacterList_byEpisode = (
  charactersUrl: CharacterListStateType['charactersUrl'],
  header: CharacterListStateType['header'],
) => {
  return {
    type: UPDATE_WIKI_CHARACTER_LIST,
    payload: {
      charactersUrl,
      header,
    }
  }
}

// 点击某一个地点，跳转到character-list页面
export const updateCharacterList_byLocation = (
  name: string,
  url: string,
) => async (dispatch) => {
  // 先渲染name
  dispatch({
    type: UPDATE_WIKI_CHARACTER_LIST,
    payload: {
      charactersUrl: [],
      header: {
        title: name,
        primary: '',
        secondary: '',
      },
    }
  })
  // 请求具体信息
  const id = parseInt(url.split('location/')[1])
  getLocation.one(id)
    .then(data => dispatch({
      type: UPDATE_WIKI_CHARACTER_LIST,
      payload: {
        charactersUrl: data.residents,
        header: {
          title: data.name,
          primary: data.dimension,
          secondary: data.type,
        },
      }
    }))
}
