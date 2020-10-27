import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import configureStore from './stores/index';
import styles from './styles.css';

const store = configureStore();

const root = document.querySelector('#root');

const jsx = (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

ReactDOM.render(jsx, root);
