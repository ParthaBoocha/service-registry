import React from 'react';
import ConfigService from './config-service';

class ConfigComponent extends React.Component {
  render() {
    return (
      <ul>
        {this.getConfigListItems()}
        <li>blah1</li>
        <li>blah2</li>
      </ul>
    );
  }

  async getConfigListItems() {
    const configs = await ConfigService.getAllConfigs();
    return (
      configs.map(config => <li key={config.service}>`${config.service} - ${config.host} - ${config.port}`</li>)
    );
  }
}

export default ConfigComponent;
