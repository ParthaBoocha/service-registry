import React from 'react';
import ServiceStatusIndicator from './service-status-indicator';
import styles from './styles/main.css';

export default class ViewConfigItem extends React.PureComponent {
  render() {
    return (
      <div className={styles.card}>
        <div className={styles.content}>
          <h3>{this.props.config.service}</h3>
          <p>{this.props.config.url}</p>
          <p>{this.props.config.port}</p>
          <ServiceStatusIndicator status={this.props.status} />
          <p><button onClick={this.editItem.bind(this)}>Edit</button></p>
        </div>
      </div>
    );
  }

  editItem() {
    this.props.onEdit(this.props.config.service);
  }
}
