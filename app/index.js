import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {initStore} from './redux/store';
import {Provider} from 'react-redux';
import App from './App.container';

const store = initStore();

export default class Hivez extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}