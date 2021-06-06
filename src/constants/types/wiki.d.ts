
// 单个角色
export interface WikiCharacterType {
  id: number,
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
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

// 单个剧集
export interface WikiEpisodeType {
  id: number,
  name: string,
  air_date: string,
  episode: string,
  characters: string[],
  url: string,
  created?: string,
}

// 翻页器的state
export interface PaginationType {
  count: number,
  pages: number,
  next: string,
  prev: string,
}
