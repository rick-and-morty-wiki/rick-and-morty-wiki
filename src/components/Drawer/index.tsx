/* 
  为了省事，直接把taro-ui的源码拿过来了
  为什么不直接用taro-ui？因为taro-ui使用的是scss
  并且这样做容易更改样式
  并且这样做代码包更小（我也没搞明白为什么会这样）
 */
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import React from 'react'
import { View } from '@tarojs/components'

import { AtDrawerProps, AtDrawerState } from './type'
import './index.less'

export default class AtDrawer extends React.Component<
  AtDrawerProps,
  AtDrawerState
> {
  public static propTypes: InferProps<AtDrawerProps>
  public static defaultProps: AtDrawerProps

  public constructor(props: AtDrawerProps) {
    super(props)
    this.state = {
      animShow: false,
      _show: props.show
    }
  }

  public componentDidMount(): void {
    const { _show } = this.state
    if (_show) this.animShow()
  }

  public UNSAFE_componentWillReceiveProps(nextProps: AtDrawerProps): void {
    const { show } = nextProps
    if (show !== this.state._show) {
      show ? this.animShow() : this.animHide()
    }
  }

  private onHide(): void {
    this.setState({ _show: false }, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  private animHide(): void {
    this.setState({
      animShow: false
    })
    setTimeout(() => {
      this.onHide()
    }, 300)
  }

  private animShow(): void {
    this.setState({ _show: true })
    setTimeout(() => {
      this.setState({
        animShow: true
      })
    }, 200)
  }

  private onMaskClick(): void {
    this.animHide()
  }

  public render(): JSX.Element {
    const { mask, width, right } = this.props
    const { animShow, _show } = this.state
    const rootClassName = ['at-drawer']

    const maskStyle = {
      display: mask ? 'block' : 'none',
      opacity: animShow ? 1 : 0
    }
    const listStyle = {
      width,
      transition: animShow
        ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)'
        : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }

    const classObject = {
      'at-drawer--show': animShow,
      'at-drawer--right': right,
      'at-drawer--left': !right
    }

    return _show ? (
      <View
        className={classNames(rootClassName, classObject, this.props.className)}
      >
        <View
          className='at-drawer__mask'
          style={maskStyle}
          onClick={this.onMaskClick.bind(this)}
        ></View>

        <View className='at-drawer__content' style={listStyle}>
          {this.props.children}
        </View>
      </View>
    ) : (
      <View></View>
    )
  }
}

AtDrawer.defaultProps = {
  show: false,
  mask: true,
  width: '',
  right: false,
  items: []
}

AtDrawer.propTypes = {
  show: PropTypes.bool,
  mask: PropTypes.bool,
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  onItemClick: PropTypes.func,
  onClose: PropTypes.func
}
