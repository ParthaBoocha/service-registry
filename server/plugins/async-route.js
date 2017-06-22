import boom from 'boom';

const handlerError = (err, request, reply) => {
  if (err.isBoom) {
    reply(err);
  } else {
    // internal joi validation failure will come here
    console.error('HANDLER_ERROR', { err });
    reply(boom.wrap(err, 500));
  }
};

let register = (server, options, next) => {
    /*  perform WebSocket handling on HAPI start  */
  server.ext('onPostStart', (serv, nex) => {
        /*  iterate over all routes  */
    var connections = serv.table();

    connections.forEach(function(connection) {
      connection.table.forEach(function(route) {
        route.settings.handler = (function(handler) {
          return async(request, reply) => {
            let response = handler(request, reply);
            if (reply._replied) {
              return;
            }
            if (response) {
              if (response.then) {
                try {
                  let asyncResponse = await response;
                  reply(asyncResponse);
                } catch (err) {
                  handlerError(err, request, reply);
                }
              } else {
                reply(response);
              }
            }
          };
        })(route.settings.handler);
      });
    });

    nex();
  });

  server.ext('onPreResponse', function(request, reply) {
    let response = request.response;
    if (response.isBoom && response.data) {
      if (response.data.isJoi) {
        response.output.payload.title = 'Validation Failed';
        response.output.payload.message = response.data.details[0].message.replace(/"/g, '');
      } else {
        response.output.payload = {
          ...response.output.payload,
          ...response.data
        };
      }
    }

    return reply.continue();
  });

  next();
};

register.attributes = {
  name: 'asyncRoute',
  version: '1.0.0'
};

module.exports = { register };
