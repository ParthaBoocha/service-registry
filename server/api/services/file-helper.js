import * as File from 'fs';

const dataFile = '.data/configs.json';

function read() {
  if (!File.existsSync(dataFile)) {
    return [];
  }
  var contents = File.readFileSync(dataFile, 'utf8');
  if (!contents) {
    return [];
  }
  return JSON.parse(contents);
}

async function write(config) {
  File.writeFileSync(dataFile, JSON.stringify(config), 'utf8');
}

export default {
  read,
  write
};
