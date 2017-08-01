import AppSettingsFileStore from './app-settings-file-store';

async function get(key) {
  if (key) {
    return await AppSettingsFileStore.getOne(key);
  } else {
    return await AppSettingsFileStore.getAll();
  }
};

async function update(data) {
  if (data && Array.isArray(data)) {
    await AppSettingsFileStore.updateMany(data);
    return;
  }
  await AppSettingsFileStore.updateOne(data);
};

export default {
  get,
  update
};
