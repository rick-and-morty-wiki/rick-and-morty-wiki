import Taro from '@tarojs/taro'
import { useEffect, useState } from 'react'

/* 
  获取系统导航栏的hook
 */
export const useStatusBarHeight = (): number => {
  const [statusBarHeight, setStatusBarHeight] = useState<number>(20)

  useEffect(() => {
    Taro.getSystemInfo({
      success: function (res) {
        setStatusBarHeight(res.statusBarHeight)
      }
    })
  }, [])

  return statusBarHeight
}
