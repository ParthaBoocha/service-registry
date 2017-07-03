import React from 'react';
import ServiceStatusIndicator from './service-status-indicator';
import styles from './styles/main.css';

export default class ConfigListItem extends React.PureComponent {
  render() {
    return (
      <div className={'card'}>
        <div className={'content'}>
          <h3>{this.props.config.service}</h3>
          <p>{this.props.config.url}</p>
          <p>{this.props.config.port}</p>
          <ServiceStatusIndicator status={this.props.status} />
        </div>
      </div>
    );
  }
}
