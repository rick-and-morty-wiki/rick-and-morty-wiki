
// 单个角色
export interface CharacterType {
  id: number,
  name: string,
  status: 'Alive' | 'Dead' | 'unknown' | '',
  species: string,
  type: string,
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | '',
  origin: {
    name: string,
    url: string,
  },
  location: {
    name: string,
    url: string,
  },
  image: string,
  episode: string[],
  url: string,
  created?: string,
}

// 角色的检索条件
export interface CharacterFilterType {
  name?: string,
  status?: 'alive' | 'dead' | 'unknown' | 'all' | string,
  species?: string,
  type?: string,
  gender?: 'female' | 'male' | 'genderless' | 'unknown' | 'all' | string,
}


// 单个剧集
export interface EpisodeType {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: string[],
  url: string,
  created?: string,
}

// 单个地点
export interface LocationType {
  id: number,
  name: string,
  type: string,
  dimension: string,
  residents: string[]
  url: string,
  created?: string,
}

// 翻页器的state
export interface PaginationType {
  count: number,
  pages: number,
  cur: number,
}
