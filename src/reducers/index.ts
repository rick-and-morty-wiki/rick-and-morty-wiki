import { combineReducers } from 'redux'
import wikiCharacter from './wiki/character'
import wikiCharacterList from './wiki/characterList'
import game from './game'

const rootReducer = combineReducers({
  wikiCharacter,
  wikiCharacterList,
  game,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
