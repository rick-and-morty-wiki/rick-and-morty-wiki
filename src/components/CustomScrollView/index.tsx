import React, { useState, useEffect, forwardRef } from 'react';
import Taro from '@tarojs/taro'

import { CustomScrollViewType } from './type'
import './index.less'

let ScrollView: any;
let RefreshControl: any;
if (IS_RN) {
  // 这里为什么要用react native的ScrollView呢？
  // 1.便于写跨端的自定义下拉刷新
  // 2.rn的api可以计算到当前到页面底部的距离，taro的不行
  ScrollView = require("react-native").ScrollView;
  RefreshControl = require("react-native").RefreshControl;
} else {
  ScrollView = require("@tarojs/components").ScrollView;
}

const CustomScrollView: CustomScrollViewType = forwardRef((props, ref) => {
  const {
    className = '',
    style = {},
    onRefresh,
    autoHideTab = false,
  } = props;
  const [showTab, setShowTab] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // 只有RN端的主页做tabbar自动隐藏
    if (process.env.TARO_ENV !== 'rn' ||
      !autoHideTab ||
      Taro.getCurrentInstance().router?.path.indexOf('wiki/index') === -1
    ) { return }

    if (showTab) {
      Taro.showTabBar({ animation: true })
    } else {
      Taro.hideTabBar({ animation: true })
    }
  }, [autoHideTab, showTab])

  // RN端专属：屏幕滚动触发tab隐藏或显示
  const handleScroll = (e) => {
    if (!autoHideTab) {
      return
    }
    const {
      contentOffset: { y: toTop },  // 距离顶部距离
      velocity,  // y方向速度。+为向下滑
      contentSize: { height: contentHeight },
      layoutMeasurement: { height: screenHeight },
    } = e.nativeEvent

    const yVelo = velocity?.y || 0
    // 到底部的距离
    const toBottom = contentHeight - screenHeight - toTop

    // 如果在向下滑且没有滑倒最下面，则隐藏tab
    if (showTab && yVelo > 0 && toTop > 200) {
      setShowTab(false)
    }
    // 如果向上滑，立即显示tab
    if (!showTab && yVelo < 0) {
      setShowTab(true)
    }
    // 如果触碰了底部，立即显示tab
    if (toBottom < 50) {
      setShowTab(true)
    }
  }

  // 下拉刷新
  const onPulldownRefresh = React.useCallback(async () => {
    setRefreshing(true)
    if (onRefresh) {
      await onRefresh()
    }
    setTimeout(() => {
      setRefreshing(false)
    });
  }, [onRefresh]);

  // 只有RN端做tabbar自动隐藏
  if (process.env.TARO_ENV !== 'rn') {
    return (
      <ScrollView
        className={`custom-scroll-view ${className}`}
        style={style}
        scrollY
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={onPulldownRefresh}
        ref={ref}
        scrollWithAnimation
      >
        {props.children}
      </ScrollView>
    )
  }

  return (
    <ScrollView
      className={`custom-scroll-view ${className}`}
      style={style}
      onScroll={handleScroll}
      scrollY
      ref={ref}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onPulldownRefresh} />
      }
    >
      {props.children}
    </ScrollView>
  );
})

export default CustomScrollView;
