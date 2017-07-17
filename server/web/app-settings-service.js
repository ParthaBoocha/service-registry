import Axios from 'axios';

async function getAllAppSettings() {
  const data = await Axios.get('/appSettings');
  return data.data;
}

async function addOrUpdateAppSetting(key, value) {
  Axios.put('/appSettings', {
    key: key,
    value: value
  });
}

export default {
  getAllAppSettings,
  addOrUpdateAppSetting
};
