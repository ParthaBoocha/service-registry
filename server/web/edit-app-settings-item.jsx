import React from 'react';
import { ListItem } from 'react-toolbox/lib/list';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

export default class EditAppSettingsItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      key: props.item.key,
      value: props.item.value
    };

    this.inputChanged = this.inputChanged.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  render() {
    return <ListItem
      key={this.props.key}
      itemContent={this.getInputFields()}
      legend={this.props.value}
      rightActions={this.getActionButtons()}
    />;
  }

  getInputFields() {
    return (
      <div>
        <p><Input type='text' label='Key' name='key' value={this.state.key} onChange={this.inputChanged.bind(this, 'key')} maxLength={50} /></p>
        <p><Input type='text' label='Value' name='value' value={this.state.value} onChange={this.inputChanged.bind(this, 'value')} maxLength={100} /></p>
      </div>
    );
  }

  getActionButtons() {
    let buttons = [];
    buttons.push(<Button label='Submit' icon='save' onClick={this.submit} flat />);
    buttons.push(<Button label='Cancel' icon='cancel' onClick={this.cancel} flat />);
    return buttons;
  }

  inputChanged(name, value) {
    this.setState({ [name]: value });
  }

  submit() {
    this.props.onSubmit(this.state.key, this.state.value);
  }

  cancel() {
    this.props.onCancel();
  }
}
