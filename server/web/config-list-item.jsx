import React from 'react';
import ServiceStatusIndicator from './service-status-indicator';
import style from './styles/main.css';

export default class ConfigListItem extends React.PureComponent {
  render() {
    return (
      <div className={style.service}>
        <h3>{this.props.config.service}</h3>
        <div>{this.props.config.url}</div>
        <div>{this.props.config.port}</div>
        <ServiceStatusIndicator status={this.props.status} />
      </div>
    );
  }
}
