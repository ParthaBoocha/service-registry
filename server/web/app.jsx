'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import ServiceRegistry from './service-registry';

class App extends React.Component {
  render() {
    return (
      <ServiceRegistry />
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

