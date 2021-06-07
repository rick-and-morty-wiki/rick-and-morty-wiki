import { CharacterType } from '@constants/types'
import { ServicePaginationType } from './servicePagination'


interface CharacterFilterType {
  name: string,
  status: 'alive' | 'dead' | 'unknown',
  species: string,
  type: string,
  gender: 'female' | 'male' | 'genderless' | 'unknown',
}

export interface AllCharacterServiceType {
  info: ServicePaginationType,
  results: Array<CharacterType>
}

export interface GetCharacterType {
  all: () => Promise<AllCharacterServiceType>,
  one: (id: number) => Promise<CharacterType>,
  list: (ids: number[]) => Promise<CharacterType[]>,
  filt: (filter: CharacterFilterType) => Promise<CharacterType[]>
}