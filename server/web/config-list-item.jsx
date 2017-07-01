import React from 'react';

export default class ConfigListItem extends React.PureComponent {
  render() {
    return (
      <li>
        <h3>{this.props.config.service}</h3>
        <div>{this.props.config.url}</div>
        <div>{this.props.config.port}</div>
        <div>green</div>
      </li>
    );
  }
}
