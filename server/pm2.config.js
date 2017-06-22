let sharedEnv = Object.assign({
  NODE_ENV: 'development',
  ENVIRONMENT: 'DEV',
  LOG_FOLDER: './.logs',
  SSL_CERT_PATH: '',
  SSL_KEY_PATH: '',
  PORT: '8080',
  CORS_ORIGIN: '*',
  SWAGGER: 'on'
}, process.env);

let sharedConfig = {
  exec_mode: 'cluster',
  min_uptime: 10000,
  max_restarts: 3,
  instances: 1,
  watch: true,
  kill_timeout: 10000,
  listen_timeout: 10000,
  wait_ready: true,
  log_file: '/dev/null'
};

let apps = [
  Object.assign({
    name: 'service-discovery',
    script: 'server.js',
    env: Object.assign({ APP_NAME: 'service-discovery' }, sharedEnv)
  }, sharedConfig)
];

module.exports = apps;
