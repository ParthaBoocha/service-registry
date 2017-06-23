let configs = [
  {
    service: 'foo',
    url: 'localhost',
    port: '8080'
  },
  {
    service: 'bar',
    url: 'somehost',
    port: '5050'
  }
];

async function getOne(service) {
  return configs.find(s => s.service === service);
}

async function getAll() {
  return configs;
}

async function updateMany(list) {
  list.forEach(item => {
    updateOne(item);
  });
}

async function updateOne(item) {
  let exists = configs.find(config => config.service === item.service);
  if (exists) {
    exists.url = item.url;
    exists.port = item.port;
  } else {
    configs = configs.concat(item);
  }
}

async function printConfigs() {
  configs.forEach(config => {
    console.log(`${config.service} ${config.url} ${config.port}`);
  });
}

export default {
  getOne,
  getAll,
  updateOne,
  updateMany
};
