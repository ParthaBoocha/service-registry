import React from 'react';
import { List, ListItem } from 'react-toolbox/lib/list';

export default class AppSettingsList extends React.PureComponent {
  render() {
    return (
      <List selectable ripple>
        {this.props.items.map(appSettings => {
          return <ListItem
            key={appSettings.key}
            caption={appSettings.key}
            legend={appSettings.value}
          />;
        })}
      </List>
    );
  }
}
