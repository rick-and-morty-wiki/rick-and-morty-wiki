import Taro from "@tarojs/taro";

const baseUrl = "https://rickandmortyapi.com/api/";

const request = (endpointUrl) => {
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

const validate = qry => {
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

const getEndpoint = async (endpoint = '', opt = {}) => {
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

export const getEndpoints = () => getEndpoint()
export const getCharacter = (opt = {}) => getEndpoint('character', opt)
export const getLocation = (opt = {}) => getEndpoint('location', opt)
export const getEpisode = (opt = {}) => getEndpoint('episode', opt)
