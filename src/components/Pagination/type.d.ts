import React from 'react'
import { PaginationType } from '@constants/types'

import { ReqTriggerType } from '../../pages/wiki/pages/all-character/type'

export interface PaginationProps {
  pagination: PaginationType,
  setPagination: React.Dispatch<React.SetStateAction<PaginationType>>,
  scrollTop?: () => void,
  setReqTrigger?: React.Dispatch<React.SetStateAction<ReqTriggerType>>,
}
