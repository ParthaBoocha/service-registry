import Axios from 'axios';

async function getAllConfigs() {
  const data = await Axios.get('/config');
  return data.data;
}

async function addOrUpdateConfig(service, url, port) {
  Axios.put('/config', {
    service: service,
    url: url,
    port: port
  });
}

export default {
  getAllConfigs,
  addOrUpdateConfig
};
