import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {View,Text}from 'react-native'
import configureStore from './js/redux/store/ConfigureStore';

import App from './App';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>


    )
  }
}
