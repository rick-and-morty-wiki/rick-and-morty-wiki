import { combineReducers } from 'redux'
import wikiCharacter from './wiki/character'
import game from './game'

const rootReducer = combineReducers({
  wikiCharacter,
  game,
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
