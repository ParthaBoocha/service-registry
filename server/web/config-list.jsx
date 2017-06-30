import React from 'react';
import ConfigService from './config-service';

export default class ConfigList extends React.PureComponent {
  render() {
    return (
      <ul>
        <li>
          <h3>Service 1</h3>
          <div>localhost</div>
          <div>5555</div>
          <div>green</div>
        </li>
        <li>
          <h3>Service 2</h3>
          <div>somehost</div>
          <div>6666</div>
          <div>yellow</div>
        </li>
        <li>
          <h3>Service 3</h3>
          <div>someotherhost</div>
          <div>7777</div>
          <div>red</div>
        </li>
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

