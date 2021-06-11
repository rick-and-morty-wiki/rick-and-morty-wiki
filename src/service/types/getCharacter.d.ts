import { CharacterType, CharacterFilterType } from '@constants/types'
import { ServicePaginationType } from './servicePagination'


export interface AllCharacterServiceType {
  info: ServicePaginationType,
  results: Array<CharacterType>
}

export interface GetCharacterType {
  all: (page: { page: number } | void) => Promise<AllCharacterServiceType>,
  one: (id: number) => Promise<CharacterType>,
  list: (ids: number[]) => Promise<CharacterType[]>,
  filt: (filter: CharacterFilterType) => Promise<CharacterType[]>
}