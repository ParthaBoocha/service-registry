import React from 'react';

export default class ServiceStatusIndicator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.statusText = {
      green: 'Available',
      yellow: 'Intermittent',
      red: 'Offline'
    };
  }

  render() {
    return (
      <div>
        <svg version='1.1'
          width='10' height='10'
          viewBox='0 0 5 2'
          preserveAspectRatio='xMinYMid slice'>
          <circle cx='1' cy='1' r='1' fill={this.props.status} />
        </svg>
        &nbsp;&nbsp;
        {this.statusText[this.props.status]}
      </div>
    );
  }
}
