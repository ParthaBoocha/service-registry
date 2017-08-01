import React from 'react';
import ViewAppSettingsItem from './view-app-settings-item';
import EditAppSettingsItem from './edit-app-settings-item';
import { List } from 'react-toolbox/lib/list';

export default class AppSettingsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  render() {
    return (
      <List selectable ripple>
        {this.props.items.map(appSetting => {
          if (this.props.currentEditKey != appSetting.key) {
            return <ViewAppSettingsItem
              key={appSetting.key}
              item={appSetting}
              onEdit={this.edit}
              onDelete={this.delete}
            />;
          } else {
            return <EditAppSettingsItem
              key={appSetting.key}
              item={appSetting}
              onSubmit={this.submit}
              onCancel={this.cancel}
            />;
          }
        })}
      </List>
    );
  }

  edit(key) {
    this.props.onEdit(key);
  }

  delete(key) {
    this.props.onDelete(key);
  }

  submit(key, value) {
    this.props.onSubmit(key, value);
  }

  cancel() {
    this.props.onCancel();
  }
}
