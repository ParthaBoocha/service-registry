import FileHelper from './file-helper';
const fileHelper = new FileHelper('.data/app-settings.json');

let appSettings = fileHelper.read();

async function getOne(key) {
  return appSettings.find(s => s.key === key);
}

async function getAll() {
  return appSettings;
}

async function updateMany(list) {
  list.forEach(item => {
    updateOne(item, false);
  });
  writeFile();
}

async function updateOne(item, shouldWriteFile = true) {
  let exists = appSettings.find(setting => setting.key === item.key);
  if (exists) {
    exists.value = item.value;
  } else {
    appSettings = appSettings.concat(item);
  }
  if (shouldWriteFile) {
    writeFile();
  }
}

async function writeFile() {
  fileHelper.write(appSettings);
}

async function printAppSettings() {
  appSettings.forEach(setting => {
    console.log(`${setting.key} ${setting.value}`);
  });
}

export default {
  getOne,
  getAll,
  updateOne,
  updateMany
};
