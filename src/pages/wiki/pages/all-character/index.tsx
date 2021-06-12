import React, { useState } from 'react'

import { CharacterFilterType } from '@constants/types'

// import AllCharacterRN from './rn'
// import AllCharacterWE from './weapp'
import './index.less'

let AllCharacterP: any
if (process.env.TARO_ENV === 'rn') {
  AllCharacterP = require('./rn').default
} else {
  AllCharacterP = require('./weapp').default
}


const AllCharacter: React.FC<any> = () => {
  const [filter, setFilter] = useState<CharacterFilterType>({
    name: '',
    status: 'all',
    species: 'all',
    type: 'all',
    gender: 'all',
  })

  if (process.env.TARO_ENV === 'rn') {
    return <AllCharacterP filter={filter} setFilter={setFilter} />
  }

  return <AllCharacterP filter={filter} setFilter={setFilter} />
}

export default AllCharacter
