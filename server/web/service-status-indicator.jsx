import React from 'react';

export default class ServiceStatusIndicator extends React.PureComponent {
  render() {
    return (
      <svg version='1.1'
        width='10' height='10'
        viewBox='0 0 5 2'
        preserveAspectRatio='xMinYMid slice'>
        <circle cx='1' cy='1' r='1' fill={this.props.status} />
      </svg>
    );
  }
}
