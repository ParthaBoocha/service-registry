import React from 'react';
import ConfigService from './config-service';
import ViewConfigItem from './view-config-item';
import EditConfigItem from './edit-config-item';

export default class ConfigList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      configs: [],
      currentEditKey: undefined
    };
    this.editItem = this.editItem.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  staticEntries() {
    return { configs: [{
      service: 'Service 1',
      url: 'localhost',
      port: 5555
    }, {
      service: 'Service 2',
      url: 'somehost',
      port: 6666
    }, {
      service: 'Service 3',
      url: 'someotherhost',
      port: 7777
    }] };
  }

  async componentWillMount() {
    this.fetchConfigs();
  }

  async fetchConfigs() {
    let configs = await ConfigService.getAllConfigs();
    this.setState({ configs: configs });
  }

  getItems() {
    return this.state.configs.map(config => {
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
    await ConfigService.addOrUpdateConfig(service, url, port);
    this.fetchConfigs();
    this.setState({ currentEditKey: undefined });
  }

  render() {
    return (
      <div>
        {this.getItems()}
      </div>
    );
  }
}

