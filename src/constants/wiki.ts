import _ from "lodash";
import { WikiCharacterType } from "./type";

// 更新角色数据
export const UPDATE_WIKI_CHARACTER = "UPDATE_WIKI_CHARACTER";
// 更新角色列表数据
export const UPDATE_WIKI_CHARACTER_LIST = "UPDATE_WIKI_CHARACTER_LIST";

// 更新地点数据
export const UPDATE_WIKI_LOCATION = "UPDATE_WIKI_LOCATION";
// 更新地点列表数据
export const UPDATE_WIKI_LOCATION_LIST = "UPDATE_WIKI_LOCATION_LIST";

// 更新剧集数据
export const UPDATE_WIKI_EPISODE = "UPDATE_WIKI_EPISODE";
// 更新剧集列表数据
export const UPDATE_WIKI_EPISODE_LIST = "UPDATE_WIKI_EPISODE_LIST";

// 空白角色数据
export const defaultCharacter: WikiCharacterType = {
  id: 0,
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
  origin: {
    name: "",
    url: ""
  },
  location: {
    name: "",
    url: ""
  },
  image: "",
  episode: [""],
  url: ""
};

// 获取首页数据时的渲染数据，用来绘制空白组件库
export const defaultRandomCharacters: WikiCharacterType[] = "123456"
  .split("")
  .map(id => {
    const newCharacter: WikiCharacterType = _.cloneDeep(defaultCharacter);
    newCharacter.id = parseInt(id) * 10000;
    return newCharacter;
  });
