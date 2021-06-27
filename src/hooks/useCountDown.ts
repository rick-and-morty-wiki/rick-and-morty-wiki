import { useCallback, useState, useEffect } from 'react'

/* 
  倒计时实现
 */
export interface CountDown {
  time: number,
  decrease: () => void,
}

// 用来防止重复计时
let countdownTimeout: any

export const useCountDown = (
  startTime: number
): {
  countDown: CountDown,
  refreshCountDown: () => void,
} => {
  const [countDown, setCountDown] = useState<CountDown>({
    time: startTime,
    decrease: () => setTimeout(() => setCountDown(preState => ({ ...preState, time: preState.time - 1 })), 1000),
  })

  useEffect(() => {
    if (countDown.time > 0) {
      countdownTimeout = countDown.decrease()
    }
  }, [countDown])

  // 刷新倒计时
  const refreshCountDown = useCallback(() => {
    clearTimeout(countdownTimeout)
    setCountDown(preState => ({ ...preState, time: startTime }))
  }, [startTime])

  return {
    countDown,
    refreshCountDown,
  }
}
