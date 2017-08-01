'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import ServiceRegistry from './service-registry';
import AppSettings from './app-settings';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import styles from './styles/main';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <AppBar title='Zen' fixed>
            <Navigation className={styles.navigation}>
              <ul>
                <li><NavLink activeClassName={styles.active} to='/serviceRegistry'>Service Registry</NavLink></li>
                <li><NavLink activeClassName={styles.active} to='/appSettings'>App Settings</NavLink></li>
              </ul>
            </Navigation>
          </AppBar>
          <Switch>
            <Route path='/serviceRegistry' component={ServiceRegistry} />
            <Route path='/appSettings' component={AppSettings} />
            <Redirect from='/' to='/serviceRegistry' />
          </Switch>
        </div>
      </HashRouter>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

