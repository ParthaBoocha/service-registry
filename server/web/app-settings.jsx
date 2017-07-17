import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import AppSettingsService from './app-settings-service';
import AppSettingsList from './app-settings-list';
import styles from './styles/main';

export default class AppSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { appSettings: [] };
  }

  async componentWillMount() {
    this.fetchAppSettings();
  }

  render() {
    return (
      <div className={styles.mainContent}>
        <Button className={styles.addButton} icon='add' onClick={this.addNew} accent floating />
        <AppSettingsList
          items={this.state.appSettings}
          refreshItems={this.fetchConfigs}
          addOrUpdate={this.addOrUpdate} />
      </div>);
  }

  async fetchAppSettings() {
    let appSettings = await AppSettingsService.getAllAppSettings();
    this.setState({ appSettings: appSettings });
  }

  addNew() {

  }

  async addOrUpdate() {

  }
};
