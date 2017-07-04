import React from 'react';
import ConfigService from './config-service';
import ConfigList from './config-list';
import AddConfigItem from './add-config-item';

export default class ServiceRegistry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      configs: [],
      isAddMode: false
    };
    this.fetchConfigs = this.fetchConfigs.bind(this);
    this.addNew = this.addNew.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
    this.addOrUpdate = this.addOrUpdate.bind(this);
  }

  async componentWillMount() {
    this.fetchConfigs();
  }

  render() {
    return (
      <div>
        <h1>Service Registry</h1>
        <button type='button' onClick={this.addNew}>Add New</button>
        <ConfigList
          items={this.state.configs}
          refreshItems={this.fetchConfigs}
          addOrUpdate={this.addOrUpdate} />
        {this.getAddModal()}
      </div>
    );
  }

  async fetchConfigs() {
    let configs = await ConfigService.getAllConfigs();
    this.setState({ configs: configs });
  }

  addNew() {
    this.setState({ isAddMode: true });
  }

  getAddModal() {
    if (this.state.isAddMode) {
      return <AddConfigItem onSubmit={this.addOrUpdate} onCancel={this.cancelAdd} />;
    }
  }

  cancelAdd() {
    this.setState({ isAddMode: false });
  }

  async addOrUpdate(service, url, port) {
    this.setState({ isAddMode: false });
    await ConfigService.addOrUpdateConfig(service, url, port);
    this.fetchConfigs();
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
}
