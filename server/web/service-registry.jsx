import React from 'react';
import ConfigService from './config-service';
import ConfigList from './config-list';

export default class ServiceRegistry extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { configs: [] };
    this.fetchConfigs = this.fetchConfigs.bind(this);
  }

  async componentWillMount() {
    this.fetchConfigs();
  }

  async fetchConfigs() {
    let configs = await ConfigService.getAllConfigs();
    this.setState({ configs: configs });
  }

  render() {
    return (
      <div>
        <h1>Service Registry</h1>
        <ConfigList items={this.state.configs} refreshItems={this.fetchConfigs} />
      </div>
    );
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
