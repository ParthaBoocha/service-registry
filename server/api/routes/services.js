'use strict';

import ConfigService from '../services/config-service';

exports.register = (server, options, next) => {
  let routes = [
    {
      method: 'GET',
      path: '/',
      handler: request => {
        return 'Hello';
      }
    },
    {
      method: 'GET',
      path: '/config',
      handler: async(request) => {
        return await ConfigService.get();
      }
    }
  ];

  server.route(routes);

  next();
};

exports.register.attributes = { name: 'api' };
