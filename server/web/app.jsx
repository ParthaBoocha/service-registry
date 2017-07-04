'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import ConfigList from './config-list';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Configuration List</h1>
        <ConfigList />
      </div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

