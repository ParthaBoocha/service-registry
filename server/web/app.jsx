'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ServiceRegistry from './service-registry';
import AppSettings from './app-settings';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <AppBar title='Service Registry' fixed>
            <Navigation type='horizontal'>
              <NavLink to='/serviceRegistry'>Service Registry</NavLink>
              <NavLink to='/appSettings'>App Settings</NavLink>
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

