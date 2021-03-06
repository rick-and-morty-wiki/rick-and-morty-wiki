import { ComponentClass, CSSProperties } from 'react'

export interface AtComponent {
  className?: string

  customStyle?: string | CSSProperties
}

export interface AtIconBaseProps2 extends AtComponent {
  value: string

  color?: string
}

export interface AtIconBaseProps extends AtComponent {
  value: string

  color?: string

  prefixClass?: string

  size?: number | string
}

export interface AtDrawerProps extends AtComponent {
  /**
   * 展示或隐藏
   * @default false
   */
  show: boolean
  /**
   * 是否需要遮罩
   * @default true
   */
  mask?: boolean
  /**
   * 抽屉宽度
   * @default 230px
   */
  width?: string
  /**
   * 是否从右侧滑出
   * @default false
   */
  right?: boolean
  /**
   * Array
   */
  items?: Array<string>
  /**
   * 点击菜单时触发
   */
  onItemClick?: (index: number) => void
  /**
   * 动画结束组件关闭的时候触发
   */
  onClose?: () => void
}

export interface AtDrawerState {
  animShow: boolean,
  _show: boolean
}

declare const AtDrawer: ComponentClass<AtDrawerProps>

export default AtDrawer
