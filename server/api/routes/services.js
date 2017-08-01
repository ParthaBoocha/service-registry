import ConfigService from '../services/config-service';
import AppSettingsService from '../services/app-settings-service';

exports.register = (server, options, next) => {
  let routes = [
    {
      method: 'GET',
      path: '/config/{service?}',
      handler: async(request, reply) => reply(ConfigService.get(request.params.service))
    },
    {
      method: ['PUT', 'POST'],
      path: '/config',
      handler: async(request, reply) => reply(ConfigService.update(request.payload))
    },
    {
      method: 'GET',
      path: '/appSettings/{key?}',
      handler: async(request, reply) => reply(AppSettingsService.get(request.params.key))
    },
    {
      method: ['PUT', 'POST'],
      path: '/appSettings',
      handler: async(request, reply) => reply(AppSettingsService.update(request.payload))
    }
  ];

  server.route(routes);

  next();
};

exports.register.attributes = { name: 'api' };
