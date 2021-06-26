import Taro from '@tarojs/taro'

/* 
  复制内容到剪切板
 */
export const copy = (data: string, msg: string = '') => {
  Taro.setClipboardData({
    data: data,
    success: function () {
      Taro.showToast({
        title: msg || '复制成功',
        icon: 'success',
        duration: 1200
      })
    },
    fail: function () {
      Taro.showToast({
        title: '复制失败！',
        icon: 'none',
        duration: 1200
      })
    }
  })
}
