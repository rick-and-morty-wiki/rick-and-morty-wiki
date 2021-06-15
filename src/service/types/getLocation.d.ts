import { LocationType } from '@constants/types'
import { ServicePaginationType } from './servicePagination'


interface LocationFilterType {
  name: string,
  type: string,
  dimension: string,
}

export interface LocationServiceResType {
  info: ServicePaginationType,
  results: Array<LocationType> | LocationType
}

export interface GetLocationType {
  all: () => Promise<LocationServiceResType>,
  one: (id: number) => Promise<LocationType>,
  list: (ids: number[]) => Promise<LocationType[]>,
  filt: (filter: LocationFilterType) => Promise<LocationServiceResType>
}