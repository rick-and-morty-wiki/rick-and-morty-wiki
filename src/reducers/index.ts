import { combineReducers } from 'redux'
import wikiCharacter from './wiki/character'
import wikiCharacterList from './wiki/characterList'

const rootReducer = combineReducers({
  wikiCharacter,
  wikiCharacterList,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
