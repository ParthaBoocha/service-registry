import React from 'react';
import ConfigService from './config-service';
import ViewConfigItem from './view-config-item';
import EditConfigItem from './edit-config-item';

export default class ConfigList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentEditKey: undefined };
    this.editItem = this.editItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  getItems() {
    return this.props.items.map(config => {
      if (config.service === this.state.currentEditKey) {
        return <EditConfigItem
          config={config}
          key={config.service}
          status='green'
          onSubmit={this.submitItem}
          onCancel={this.cancelEdit}
        />;
      }
      return <ViewConfigItem
        config={config}
        key={config.service}
        status='green'
        onEdit={this.editItem}
      />;
    });
  }

  editItem(key) {
    this.setState({ currentEditKey: key });
  }

  cancelEdit() {
    this.setState({ currentEditKey: undefined });
  }

  async submitItem(service, url, port) {
    this.setState({ currentEditKey: undefined });
    await ConfigService.addOrUpdateConfig(service, url, port);
    this.props.refreshItems();
  }

  render() {
    return (
      <div>
        {this.getItems()}
      </div>
    );
  }
}

