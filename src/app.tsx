import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { SafeAreaView } from '@components'

import configStore from './store'

import './app.less'

const store = configStore()


// RN平台下解决字符显示不全问题
if (process.env.TARO_ENV === 'rn') {
  const Text = require('@tarojs/components').Text
  const StyleSheet = require('react-native').StyleSheet

  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: '',    // 可以试试 fontFamily: '',
    }
  });

  const oldRender = Text.prototype.render;
  Text.prototype.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [origin.props.style, styles.defaultFontFamily]
    });
  };
}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView>
          {this.props.children}
        </SafeAreaView>
      </Provider>
    )
  }
}

export default App
