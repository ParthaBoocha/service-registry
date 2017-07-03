import React from 'react';
import ServiceStatusIndicator from './service-status-indicator';
import styles from './styles/main.css';

export default class EditConfigItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      service: props.config.service,
      url: props.config.url,
      port: props.config.port,
      status: props.status
    };
    this.inputChanged = this.inputChanged.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.submitItem = this.submitItem.bind(this);
  }

  render() {
    return (
      <form id='editConfigForm'>
        <div className={'card'}>
          <div className={'content'}>
            <input type='text' name='service' defaultValue={this.state.service} onChange={this.inputChanged} />
            <input type='text' name='url' defaultValue={this.state.url} onChange={this.inputChanged} />
            <input type='number' name='port' defaultValue={this.state.port} onChange={this.inputChanged} />
            <ServiceStatusIndicator status={this.state.status} />
            <p><button type='submit' onClick={this.submitItem}>Submit</button></p>
            <p><button type='button' onClick={this.cancelEdit}>Cancel</button></p>
          </div>
        </div>
      </form>
    );
  }

  submitItem(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.service, this.state.url, this.state.port);
  }

  cancelEdit() {
    this.props.onCancel();
  }

  inputChanged(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }
}
