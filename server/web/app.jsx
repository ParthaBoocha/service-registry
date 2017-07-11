'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import ServiceRegistry from './service-registry';
import { AppBar } from 'react-toolbox/lib/app_bar';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppBar title='Service Registry' />
        <ServiceRegistry />
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

