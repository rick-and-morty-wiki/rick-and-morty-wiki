import { LocationType } from '@constants/types'
import { ServicePaginationType } from './servicePagination'


interface LocationFilterType {
  name: string,
  type: string,
  dimension: string,
}

export interface AllLocationServiceType {
  info: ServicePaginationType,
  results: Array<LocationType>
}

export interface GetLocationType {
  all: () => Promise<AllLocationServiceType>,
  one: (id: number) => Promise<LocationType>,
  list: (ids: number[]) => Promise<LocationType[]>,
  filt: (filter: LocationFilterType) => Promise<LocationType[]>
}