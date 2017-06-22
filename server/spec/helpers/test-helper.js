process.env.JWT_MOBILE_SECRET = 'uLHy7XJTcSzqXuusivW3bBiAeomz8djo22AUbAkKZqDSDOwzqvd7blVEoaCdFXr';
process.env.PASSWORD_SALT = 8;
process.env.RESET_PASSWORD_EXPIRE_HOURS = 24;
process.env.DATABASE_URL = 'postgres://user:password@localhost/patient';
process.env.JWT_STORK_SECRET = 'uLHy7XJTcSzqXuusivW3bBiAeomz8djo22AUbAkKZqDSDOwzqvd7blVEoaCdFXr';
process.env.SUPPORT_EMAIL = 'support@test.com';
process.env.ENVIRONMENT = 'TEST';
process.env.AD_DC = 'DC=ehnp,DC=corp,DC=evolenthealth,DC=com';
process.env.AD_ADMIN_CN = 'appMobileUser';
process.env.AD_ADMIN_PASSWORD = 'adminPassword';
process.env.AD_ADMIN_OU = 'Evolent Service Accounts';
process.env.AD_MOBILE_USER_OU = 'IdentifiMobileUsers';
process.env.AD_MOBILE_USER_EMAIL_DOMAIN = '@ehnp.corp.evolenthealth.com';
process.env.CHAT_SUBSCRIBE_TOPIC = 'CHAT_SUBSCRIBE_TOPIC';

var winston = require('winston');
var logger = new winston.Logger();

console.info = function() {
  logger.info.apply(logger, arguments);
};
console.warn = function() {
  logger.warn.apply(logger, arguments);
};
console.error = function() {
  logger.error.apply(logger, arguments);
};
console.debug = function() {
  logger.debug.apply(logger, arguments);
};

var mockery = require('mockery');

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});
mockery.registerMock('amqp', { createConnection: () => ({
  on: (evt, cb) => {
    if (evt === 'ready') {
      cb();
    }
  },
  exchange: (name, config, cb) => {
    cb();
  }
}) });

function MockPool() {
  this.connect = () => ({
    query: () => {},
    release: () => {}
  });
}
mockery.registerMock('pg', { Pool: MockPool });

mockery.registerMock('nodemailer', { createTransport: () => ({ sendMail: () => {} }) });

let twilioMock = () => ({ messages: { create: () => {} } });
mockery.registerMock('twilio', twilioMock);

global.ldapAsync = {
  bindAsync: async (username, pw) => {},
  unbindAsync: async () => {},
  addAsync: async () => {},
  modifyAsync: async () => {},
  searchAsync: async (base, opts) => {},
  destroy: () => {}
};
mockery.registerMock('ldapjs', {
  createClient: () => (global.ldapAsync),
  Change: function(obj) { return obj; }
});

mockery.registerMock('redis', {
  RedisClient: { prototype: {} },
  Multi: { prototype: {} },
  createClient: () => ({
    on: (evt, cb) => {
      if (evt === 'ready') {
        cb();
      }
    },
    setexAsync: () => {},
    getAsync: () => {},
    delAsync: () => {}
  })
});

const _it = it;
global.it = function(desc, test) {
  _it(desc, function(done) {
    let result = test(done);
    if (result && result.then) {
      result.then(done, done.fail);
    } else {
      done();
    }
  });
};

const _fit = fit // eslint-disable-line
global.fit = function(desc, test) {
  _fit(desc, function(done) {
    let result = test(done);
    if (result && result.then) {
      result.then(done, done.fail);
    } else {
      done();
    }
  });
};
