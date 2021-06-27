import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

export const usePageId = (): string => {
  const [id, setId] = useState<string>('0')

  useEffect(() => {
    const { router } = Taro.getCurrentInstance()
    const id_ = router?.params.id
    if (id_) {
      setId(id_)
    }
  }, [])

  return id
}
