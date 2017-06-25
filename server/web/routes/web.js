exports.register = (server, options, next) => {
  let routes = [
    {
      method: 'GET',
      path: '/{param*}',
      handler: { directory: {
        path: './web', listing: false, index: true
      } }
    }, {
      method: 'GET',
      path: '/client.bundle.js',
      handler: (request, reply) => {
        reply.file('./web/build/client.bundle.js');
      }
    }, {
      method: 'GET',
      path: '/client.bundle.js.map',
      handler: (request, reply) => {
        reply.file('./web/build/client.bundle.js.map');
      }
    }, {
      method: 'GET',
      path: '/main.css',
      handler: (request, reply) => {
        reply.file('./web/build/main.css');
      }
    }, {
      method: 'GET',
      path: '/main.css.map',
      handler: (request, reply) => {
        reply.file('./web/build/main.css.map');
      }
    }
  ];

  server.route(routes);

  next();
};

exports.register.attributes = { name: 'web' };
