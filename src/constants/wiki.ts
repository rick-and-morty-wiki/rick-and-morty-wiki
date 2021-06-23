import _ from 'lodash';
import { CharacterType, EpisodeType, CharacterFilterType, PaginationType } from './types';

// 更新角色数据
export const UPDATE_WIKI_CHARACTER = 'UPDATE_WIKI_CHARACTER';
// 更新角色列表数据
export const UPDATE_WIKI_CHARACTER_LIST = 'UPDATE_WIKI_CHARACTER_LIST';

// 更新地点数据
export const UPDATE_WIKI_LOCATION = 'UPDATE_WIKI_LOCATION';
// 更新地点列表数据
export const UPDATE_WIKI_LOCATION_LIST = 'UPDATE_WIKI_LOCATION_LIST';

// 更新剧集数据
export const UPDATE_WIKI_EPISODE = 'UPDATE_WIKI_EPISODE';
// 更新剧集列表数据
export const UPDATE_WIKI_EPISODE_LIST = 'UPDATE_WIKI_EPISODE_LIST';

// 空白角色数据
export const defaultCharacter: CharacterType = {
  id: 0,
  name: '',
  status: '',
  species: '',
  type: '',
  gender: '',
  origin: {
    name: '',
    url: ''
  },
  location: {
    name: '',
    url: ''
  },
  image: '',
  episode: [''],
  url: ''
};

// 空白角色filter数据
export const defaultCharacterFilter: CharacterFilterType = {
  name: '',
  status: 'all',
  species: 'all',
  type: 'all',
  gender: 'all',
};

// 分页器的初始数据
export const defaultPagination: PaginationType = {
  count: -1,
  pages: 1,
  cur: 1,
}

// 获取首页数据时的渲染数据，渲染骨架屏
export const defaultSixCharacters: CharacterType[] = '123456'
  .split('')
  .map(id => {
    const newCharacter: CharacterType = _.cloneDeep(defaultCharacter);
    newCharacter.id = parseInt(id) * 10000;
    return newCharacter;
  });

// 空白单个剧集数据
export const defaultEpisode: EpisodeType = {
  id: 0,
  name: '',
  air_date: '',
  episode: 'S00E00',
  characters: [],
  url: '',
}

// 渲染骨架屏的数据
export const defaultEpisodes: EpisodeType[] = '12345678'
  .split('')
  .map(id => {
    const newEpisode: EpisodeType = _.cloneDeep(defaultEpisode);
    newEpisode.id = parseInt(id) * 10000;
    return newEpisode;
  });
