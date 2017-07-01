const fs = require('fs');

let registrations = [
  { plugin: './api/routes/services' },
  { plugin: './plugins/async-route' }];

if (process.env.NODE_ENV !== 'production') {
  registrations.push({ plugin: {
    register: 'good',
    options: {
      ops: false,
      reporters: { console: [
        {
          module: 'good-console',
          args: [{ events: { response: '*' } }]
        },
        'stdout'
      ] }
    }
  } });
}

if (process.env.SWAGGER) {
  registrations = registrations.concat([{ plugin: 'inert' }, { plugin: 'vision' }, { plugin: 'hapi-swagger' }]);
}

module.exports = {
  connections: [{
    port: process.env.PORT || 8080,
    routes: {
      cors: {
        credentials: true,
        origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['*']
      },
      validate: { options: { stripUnknown: true } }
    },
    router: { stripTrailingSlash: true },
    tls: process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH ? {
      key: fs.readFileSync(process.env.SSL_KEY_PATH, 'utf8'),
      cert: fs.readFileSync(process.env.SSL_CERT_PATH, 'utf8')
    } : false
  }],
  registrations: registrations
};
