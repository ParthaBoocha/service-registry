'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import ConfigComponent from './config-component';

class App extends React.Component {
  render() {
    return (
      <ConfigComponent />
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

