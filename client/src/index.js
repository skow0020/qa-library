import App from 'App';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import middleware from 'redux/middleware'
import reducer from 'redux/reducers'

const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

