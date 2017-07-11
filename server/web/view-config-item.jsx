import React from 'react';
import ServiceStatusIndicator from './service-status-indicator';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';

export default class ViewConfigItem extends React.PureComponent {
  render() {
    return (
      <Card style={{
        width: '350px',
        float: 'left',
        margin: 10
      }}>
        <CardTitle
          avatar={`https://placeimg.com/80/80/animals?${new Date().getTime()}`}
          title={this.props.config.service}
        />
        <CardMedia
          aspectRatio='wide'
          image={`https://placeimg.com/800/450/nature?${new Date().getTime()}`}
        />
        <CardText>
          <p>{this.props.config.url}</p>
          <p>{this.props.config.port}</p>
          <ServiceStatusIndicator status={this.props.status} />
        </CardText>
        <CardActions>
          <Button icon='edit' label='Edit' onClick={this.editItem.bind(this)} flat primary />
        </CardActions>
      </Card>
    );
  }

  editItem() {
    this.props.onEdit(this.props.config.service);
  }
}
