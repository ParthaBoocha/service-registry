import React from 'react';
import ServiceStatusIndicator from './service-status-indicator';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';

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
      <Card style={{
        width: '350px',
        float: 'left',
        margin: 10
      }}>
        <CardTitle
          avatar='https://placeimg.com/80/80/animals'
          title={this.state.service}
        />
        <CardText>
          <Input type='text' label='Service' name='service' value={this.state.service} onChange={this.inputChanged} maxLength={20} />
          <Input type='text' label='URL' name='url' value={this.state.url} onChange={this.inputChanged} maxLength={50} />
          <Input type='number' label='Port' name='port' value={this.state.port} onChange={this.inputChanged} maxLength={6} />
          <ServiceStatusIndicator status={this.props.status} />
        </CardText>
        <CardActions>
          <Button label='Submit' icon='save' onClick={this.submit} flat primary />
          <Button label='Cancel' icon='cancel' onClick={this.cancel} flat primary />
        </CardActions>
      </Card>
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
