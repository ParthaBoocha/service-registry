'use strict';
require('babel-register');
require('babel-polyfill');

require('./config-winston');

const Glue = require('glue');
const manifest = require('./server-config');

const startServer = (err, server) => {
  if (err) {
    console.error('SERVER_ERROR', { err });
  }
  server.start(() => {
    console.debug('server listening on ' + server.info.uri.toLowerCase());
  });

  process.on('SIGINT', function() {
    server.stop(function(err) {
      if (err) {
        console.error('SERVER_STOP_ERROR', { err });
      } else {
        console.debug('server stopped successfully');
      }
      process.exit(err ? 1 : 0);
    });
  });
};

Glue.compose(manifest, { relativeTo: __dirname }, startServer);
