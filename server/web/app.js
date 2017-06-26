'use strict';

require('babel-register');
require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>Hello World!</div>
    );
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

