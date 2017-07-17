import FileHelper from './file-helper';
const fileHelper = new FileHelper('.data/service-registry.json');

let configs = fileHelper.read();

async function getOne(service) {
  return configs.find(s => s.service === service);
}

async function getAll() {
  return configs;
}

async function updateMany(list) {
  list.forEach(item => {
    updateOne(item, false);
  });
  writeFile();
}

async function updateOne(item, shouldWriteFile = true) {
  let exists = configs.find(config => config.service === item.service);
  if (exists) {
    exists.url = item.url;
    exists.port = item.port;
  } else {
    configs = configs.concat(item);
  }
  if (shouldWriteFile) {
    writeFile();
  }
}

async function writeFile() {
  fileHelper.write(configs);
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
