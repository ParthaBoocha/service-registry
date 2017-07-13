'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import ServiceRegistry from './service-registry';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import styles from './styles/main';

class AppSettings extends React.PureComponent {
  render() {
    return (
      <div className={styles.mainContent}>
    App Settings Page
      </div>);
  }
};

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <AppBar title='Service Registry' fixed>
            <Navigation type='horizontal'>
              <Link to='/serviceRegistry'>Service Registry</Link>
              <Link to='/appSettings'>App Settings</Link>
            </Navigation>
          </AppBar>
          <Route path='/serviceRegistry' component={ServiceRegistry} />
          <Route path='/appSettings' component={AppSettings} />
        </div>
      </HashRouter>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

