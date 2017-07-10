using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace service_registry
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly HttpClient _httpClient;
        private readonly ILocalCache _localCache;

        public ConfigurationService(HttpMessageHandler httpMessageHandler = null, ILocalCache localCache = null)
        {
            _httpClient = httpMessageHandler != null ? new HttpClient(httpMessageHandler) : new HttpClient();
            _localCache = localCache ?? new LocalFileCache() ;
        }

        public async Task<Configuration> GetConfiguration(string serviceRegistryUrl, string service)
        {
            var response = await _httpClient.GetStringAsync(serviceRegistryUrl + "/config/" + service);
            if(!string.IsNullOrEmpty(response)) {
                var config = JsonConvert.DeserializeObject<Configuration>(response);
                if(!string.IsNullOrEmpty(config.Service))
                {
                    await _localCache.Save(config);
                }
                return config;
            }

            return new Configuration();
        }

        public async Task<List<Configuration>> GetAll(string serviceRegistryUrl)
        {
            var response = await _httpClient.GetStringAsync(serviceRegistryUrl + "/configs");
            if(!string.IsNullOrEmpty(response)) {
                return JsonConvert.DeserializeObject<Configuration[]>(response).ToList();
            }

            return new List<Configuration>();
        }
    }
}