import React, { useState } from 'react'

import { CharacterFilterType } from '@constants/types'
import { defaultCharacterFilter } from '@constants/wiki'

import { ReqTriggerType } from './type'
import './index.less'


let AllCharacterP: any
if (process.env.TARO_ENV === 'rn') {
  AllCharacterP = require('./rn').default
} else {
  AllCharacterP = require('./weapp').default
}

const AllCharacter: React.FC<any> = () => {
  const [filter, setFilter] = useState<CharacterFilterType>(defaultCharacterFilter)
  const [reqTrigger, setReqTrigger] = useState<ReqTriggerType>({
    trigger: true,
    firstFilter: false,
  })

  if (process.env.TARO_ENV === 'rn') {
    return (
      <AllCharacterP
        filter={filter}
        setFilter={setFilter}
        reqTrigger={reqTrigger}
        setReqTrigger={setReqTrigger}
      />
    )
  }

  return (
    <AllCharacterP
      filter={filter}
      setFilter={setFilter}
      reqTrigger={reqTrigger}
      setReqTrigger={setReqTrigger}
    />
  )
}

export default AllCharacter
