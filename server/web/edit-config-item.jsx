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
    this.cancel = this.cancel.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <form id='editConfigForm'>
        <div className={'card'}>
          <div className={'content'}>
            <p>
              <label>Service:</label>
              <input type='text' name='service' defaultValue={this.state.service} onChange={this.inputChanged} />
            </p>
            <p>
              <label>URL:</label>
              <input type='text' name='url' defaultValue={this.state.url} onChange={this.inputChanged} />
            </p>
            <p>
              <label>Port:</label>
              <input type='number' name='port' defaultValue={this.state.port} onChange={this.inputChanged} />
            </p>
            <ServiceStatusIndicator status={this.state.status} />
            <p><button type='submit' onClick={this.submit}>Submit</button></p>
            <p><button type='button' onClick={this.cancel}>Cancel</button></p>
          </div>
        </div>
      </form>
    );
  }

  submit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.service, this.state.url, this.state.port);
  }

  cancel() {
    this.props.onCancel();
  }

  inputChanged(event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }
}
