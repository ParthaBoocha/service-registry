import React from 'react';
import EditConfigItem from './edit-config-item';
import Dialog from 'react-toolbox/lib/dialog';

export default class AddConfigItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  actions = [
    {
      label: 'Save', onClick: this.submit
    },
    {
      label: 'Cancel', onClick: this.cancel
    }
  ];

  render() {
    var config = {};

    return (
      <Dialog
        active
        actions={this.actions}
        onEscKeyDown={this.cancel}
        onOverlayClick={this.cancel}
        title='Add New Config'
      >
        <EditConfigItem
          config={config}
          key={config.service}
          status='green'
          onSubmit={this.submit}
          onCancel={this.cancel}
        />
      </Dialog>
    );
  }

  submit(service, url, port) {
    this.props.onSubmit(service, url, port);
  }

  cancel() {
    this.props.onCancel();
  }
}
