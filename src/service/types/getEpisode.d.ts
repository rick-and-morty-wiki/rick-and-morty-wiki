import { EpisodeType } from '@constants/types'
import { ServicePaginationType } from './servicePagination'


interface EpisodeFilterType {
  name: string,
  episode: number,
}

export interface AllEpisodeServiceType {
  info: ServicePaginationType,
  results: Array<EpisodeType>
}

export interface GetEpisodeType {
  all: () => Promise<AllEpisodeServiceType>,
  one: (id: number) => Promise<EpisodeType>,
  list: (ids: number[]) => Promise<EpisodeType[]>,
  filt: (filter: EpisodeFilterType) => Promise<EpisodeType[]>
}