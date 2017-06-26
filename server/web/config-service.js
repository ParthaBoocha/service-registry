import Axios from 'axios';

async function getAllConfigs() {
  const data = await Axios.get('/config');
  return data.data;
}

export default { getAllConfigs };
