import React from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import { Button } from 'react-toolbox/lib/button';

export default class ViewAppSettingsItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  render() {
    return <ListItem
      key={this.props.item.key}
      caption={this.props.item.key}
      legend={this.props.item.value}
      rightActions={this.getActionButtons()}
    />;
  }

  getActionButtons() {
    let buttons = [];
    buttons.push(<Button label='Edit' icon='edit' onClick={this.edit} flat />);
    buttons.push(<Button label='Delete' icon='delete' onClick={this.delete} flat />);
    return buttons;
  }

  edit() {
    this.props.onEdit(this.props.item.key);
  }

  delete() {
    this.props.onDelete(this.props.item.key);
  }
}
