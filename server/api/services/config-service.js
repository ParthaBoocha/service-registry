import ConfigFileStore from './config-file-store';

async function get(service) {
  if (service) {
    return await ConfigFileStore.getOne(service);
  } else {
    return await ConfigFileStore.getAll();
  }
};

async function update(data) {
  if (data && Array.isArray(data)) {
    await ConfigFileStore.updateMany(data);
    return;
  }
  await ConfigFileStore.updateOne(data);
};

export default {
  get,
  update
};
