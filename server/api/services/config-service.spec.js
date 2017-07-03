import FileHelper from './file-helper';
import ConfigService from './config-service';

describe('Config Service tests', () => {
  beforeEach(() => {
    spyOn(FileHelper, 'write').and.callFake(() => {});
    ConfigService.update([{
      service: 'xyz',
      url: 'xyzurl',
      port: 123
    }, {
      service: 'abc',
      url: 'hostabc',
      port: 567
    }]);
  });
  describe('when getting config for a service', () => {
    it('should return the config for that service', async() => {
      const config = await ConfigService.get('abc');
      expect(config.service).toEqual('abc');
      expect(config.url).toEqual('hostabc');
      expect(config.port).toEqual(567);
    });
  });
  describe('when getting all configs', () => {
    it('should return all the configs', async() => {
      const configs = await ConfigService.get();
      expect(configs instanceof Array).toBeTruthy();
    });
  });
  describe('when adding a new entry', () => {
    it('should add the new entry', async() => {
      ConfigService.update({
        service: 'newservice',
        url: 'newserviceurl',
        port: 8888
      });
      var addedConfig = await ConfigService.get('newservice');
      expect(addedConfig.service).toEqual('newservice');
      expect(addedConfig.url).toEqual('newserviceurl');
      expect(addedConfig.port).toEqual(8888);
    });
  });
  describe('when adding and updating', () => {
    it('should add and update', async() => {
      ConfigService.update([{
        service: 'newservice',
        url: 'newserviceurl',
        port: 8888
      }, {
        service: 'abc',
        url: 'abcurl',
        port: 8989
      }]);
      var addedConfig = await ConfigService.get('newservice');
      expect(addedConfig.service).toEqual('newservice');
      expect(addedConfig.url).toEqual('newserviceurl');
      expect(addedConfig.port).toEqual(8888);
      var updatedConfig = await ConfigService.get('abc');
      expect(updatedConfig.service).toEqual('abc');
      expect(updatedConfig.url).toEqual('abcurl');
      expect(updatedConfig.port).toEqual(8989);
    });
  });
});
