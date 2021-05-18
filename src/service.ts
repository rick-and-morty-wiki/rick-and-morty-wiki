import Taro from "@tarojs/taro";

let baseUrl = "https://rickandmortyapi.com/api/";
if (process.env.TARO_ENV === 'weapp') {
  baseUrl = 'https://rickandmortyapi.cavano.vip/'
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

const validate = (qry: any) => {
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

const getEndpoint = async (endpoint: string = '', opt: any = {}) => {
  const query = validate(opt)

  try {
    const { data } = await request(endpoint + query)
    return data
  } catch (e) {
    return {
      status: e.statusCode,
      error: e.data.error
    }
  }
}

export const getEndpoints: any = () => getEndpoint()
export const getCharacter: any = (opt = {}) => getEndpoint('character', opt)
export const getLocation: any = (opt = {}) => getEndpoint('location', opt)
export const getEpisode: any = (opt = {}) => getEndpoint('episode', opt)
