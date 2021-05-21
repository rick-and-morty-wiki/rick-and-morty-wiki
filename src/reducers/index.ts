import { combineReducers } from 'redux'
import wikiCharacter from './wiki/character'

const rootReducer = combineReducers({
  wikiCharacter
})

export default rootReducer
export type RootState = ReturnType<typeof rootReducer>
