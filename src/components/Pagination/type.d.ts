import { PaginationType } from '@constants/types'
import { Dispatch, SetStateAction } from 'react'

export interface PaginationProps {
  pagination: PaginationType,
  setPagination: Dispatch<SetStateAction<PaginationType>>,
  scrollTop: () => void,
}
