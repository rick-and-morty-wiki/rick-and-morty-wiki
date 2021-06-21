import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { SafeAreaView } from '@components'

import configStore from './store'
import './app.less'

const store = configStore()

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        {/* <SafeAreaView> */}
          {this.props.children}
        {/* </SafeAreaView> */}
      </Provider>
    )
  }
}

export default App
