import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'

import './index.less'

let ScrollView: any;
let RefreshControl: any;
if (process.env.TARO_ENV === "rn") {
  // 这里为什么要用react native的ScrollView呢？
  // 1.便于写跨端的自定义下拉刷新
  // 2.rn的api可以计算到当前到页面底部的距离，taro的不行
  ScrollView = require("react-native").ScrollView;
  RefreshControl = require("react-native").RefreshControl;
} else {
  ScrollView = require("@tarojs/components").ScrollView;
}

const CustomScrollView = props => {
  const { className = '', style = {}, onRefresh = null } = props;
  const [showTab, setShowTab] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    // 只有RN端做tabbar自动隐藏
    if (process.env.TARO_ENV !== 'rn') { return }

    if (showTab) {
      Taro.showTabBar({ animation: true })
    } else {
      Taro.hideTabBar({ animation: true })
    }
  }, [showTab])

  const handleScroll = (e: { nativeEvent: { contentOffset: { y: any; }; velocity: { y: any; }; }; }) => {
    const {
      contentOffset: { y: toTop },  // 距离顶部距离
      velocity: { y: yVelo },  // y方向速度。+为向下滑
    } = e.nativeEvent
    
    // 如果在向下滑且没有滑倒最下面，则隐藏tab
    if (showTab && yVelo > 0 && toTop > 200) {
      setShowTab(false)
    }

    // 如果向上滑，立即显示tab
    if (!showTab && yVelo < 0) {
      setShowTab(true)
    }
  }

  const onPulldownRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await onRefresh()
    setRefreshing(false)
  }, [onRefresh]);

  // 只有RN端做tabbar自动隐藏
  if (process.env.TARO_ENV !== 'rn') {
    return (
      <ScrollView
        className={`custom-scroll-view ${className}`}
        style={{ ...(style as object) }}
        scrollY
        refresherEnabled
        refresherTriggered={refreshing}
        onRefresherRefresh={onPulldownRefresh}
      >
        {props.children}
      </ScrollView>
    )
  }

  return (
    <ScrollView
      className={`custom-scroll-view ${className}`}
      style={{ ...(style as object) }}
      onScroll={handleScroll}
      scrollY
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onPulldownRefresh} />
      }
    >
      {props.children}
    </ScrollView>
  );
};

export default CustomScrollView;
