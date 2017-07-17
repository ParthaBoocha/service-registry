import * as File from 'fs';

export default class FileHelper {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  read() {
    if (!File.existsSync(this.dataFile)) {
      return [];
    }
    var contents = File.readFileSync(this.dataFile, 'utf8');
    if (!contents) {
      return [];
    }
    return JSON.parse(contents);
  }

  async write(config) {
    File.writeFileSync(this.dataFile, JSON.stringify(config), { flag: 'w' });
  }
}
