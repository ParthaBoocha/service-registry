import ConfigService from '../services/config-service';

exports.register = (server, options, next) => {
  let routes = [
    {
      method: 'GET',
      path: '/config/{service?}',
      handler: async(request) => {
        return await ConfigService.get(request.params.service);
      }
    },
    {
      method: ['PUT', 'POST'],
      path: '/config',
      handler: async(request) => {
        return await ConfigService.update(request.payload);
      }
    }
  ];

  server.route(routes);

  next();
};

exports.register.attributes = { name: 'api' };
