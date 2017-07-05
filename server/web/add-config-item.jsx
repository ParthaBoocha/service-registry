import React from 'react';
import EditConfigItem from './edit-config-item';
import styles from './styles/main.css';

export default class AddConfigItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  render() {
    var config = {};

    return (
      <div id='myModal' className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.close} onClick={this.cancel}>&times;</span>
          <EditConfigItem
            config={config}
            key={config.service}
            status='green'
            onSubmit={this.submit}
            onCancel={this.cancel}
          />
        </div>
      </div>
    );
  }

  submit(service, url, port) {
    this.props.onSubmit(service, url, port);
  }

  cancel() {
    this.props.onCancel();
  }
}
