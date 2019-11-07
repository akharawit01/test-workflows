import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import DashAppHolder from './dashAppStyle'
import * as serviceWorker from './serviceWorker'

import { store, history } from './redux/store'

import './i18n'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <DashAppHolder>
        <App history={history} />
      </DashAppHolder>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
