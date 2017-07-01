import React from 'react';
import ConfigService from './config-service';
import ConfigListItem from './config-list-item';

export default class ConfigList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { configs: [] };
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

  async componentDidMount() {
    let configs = await ConfigService.getAllConfigs();
    this.setState({ configs: configs });
  }

  getItems() {
    return this.state.configs.map(config => {
      return <ConfigListItem config={config} key={config.service} />;
    });
  }

  render() {
    return (
      <ul>
        {this.getItems()}
      </ul>
    );
  }
}

