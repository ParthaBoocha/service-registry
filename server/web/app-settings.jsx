import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import AppSettingsService from './app-settings-service';
import AppSettingsList from './app-settings-list';
import styles from './styles/main';

export default class AppSettings extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      appSettings: [],
      currentEditKey: undefined
    };

    this.addNew = this.addNew.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addOrUpdate = this.addOrUpdate.bind(this);
    this.onCancel = this.onCancel.bind(this);
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
          addOrUpdate={this.addOrUpdate}
          currentEditKey={this.state.currentEditKey}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          onSubmit={this.addOrUpdate}
          onCancel={this.onCancel}
        />
      </div>);
  }

  async fetchAppSettings() {
    let appSettings = await AppSettingsService.getAllAppSettings();
    this.setState({ appSettings: appSettings });
  }

  addNew() {
    let withNewSetting = this.state.appSettings;
    withNewSetting.unshift({
      key: 'new setting', value: undefined
    });
    this.setState({
      appSettings: withNewSetting,
      currentEditKey: 'new setting'
    });
  }

  async addOrUpdate(key, value) {
    this.setState({ currentEditKey: undefined });
    await AppSettingsService.addOrUpdateAppSetting(key, value);
    this.fetchAppSettings();
  }

  onEdit(key) {
    if (this.state.currentEditKey === 'new setting') {
      let withoutNewSetting = this.state.appSettings;
      withoutNewSetting.shift();
      this.setState({
        appSettings: withoutNewSetting,
        currentEditKey: key
      });
      return;
    }
    this.setState({ currentEditKey: key });
  }

  onDelete(key) {

  }

  async onCancel() {
    this.setState({ currentEditKey: undefined });
    this.fetchAppSettings();
  }
};
