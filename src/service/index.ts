import Taro from "@tarojs/taro";
import { isArray } from '@utils/is-type'
import {
  GetCharacterType,
  GetEpisodeType,
  GetLocationType,
} from './types'


let baseUrl = "https://rickandmortyapi.com/api/";
if (process.env.TARO_ENV === 'weapp') {
  baseUrl = 'https://rickandmortyapi.cavano.vip/'
  // baseUrl = 'http://127.0.0.1:9000/'
}

const request: any = (endpointUrl: string) => {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}${endpointUrl}`
    Taro.request({
      url
    }).then(response => {
      const { statusCode } = response;
      if (statusCode >= 200 && statusCode < 300) {
        resolve(response)
      } else {
        reject(response)
      }
    })
      .catch(err => reject(err))
  })
}

const validate = (qry) => {
  if (!qry) {
    return ''
  }

  if (typeof qry === 'number' && Number.isInteger(qry) || Array.isArray(qry)) {
    return `/${qry}`
  }

  if (typeof qry === 'object') {
    return `/?${Object.keys(qry)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(qry[key])}`)
      .join('&')}`
  }

  throw new Error('As argument use an object, an array, an integer or leave it blank')
}

const getEndpoint = async (endpoint: string, opt: void | number | number[] | object) => {
  const query = validate(opt)

  try {
    const { data } = await request(endpoint + query)
    // 当请求的list的id数量为1时，api返回的不是列表而是单个对象数据，这里进行统一化
    if (isArray(opt) && (opt as number[]).length === 1) {
      return [data]
    }
    return data
  } catch (e) {
    // 返回空数据
    if (typeof opt === 'number') {
      return {}
    } else {
      return {
        info: {},
        results: [],
      }
    }
  }
}


// 获取角色数据
export const getCharacter: GetCharacterType = {
  all: (page) => getEndpoint('character', page),
  one: (id) => getEndpoint('character', id),
  list: (ids) => getEndpoint('character', ids),
  filt: (filter) => getEndpoint('character', filter)
}

// 获取地点数据
export const getLocation: GetLocationType = {
  all: () => getEndpoint('location'),
  one: (id) => getEndpoint('location', id),
  list: (ids) => getEndpoint('location', ids),
  filt: (filter) => getEndpoint('location', filter)
}

// 获取剧集数据
export const getEpisode: GetEpisodeType = {
  all: (page) => getEndpoint('episode', page),
  one: (id) => getEndpoint('episode', id),
  list: (ids) => getEndpoint('episode', ids),
  filt: (filter) => getEndpoint('episode', filter)
}
