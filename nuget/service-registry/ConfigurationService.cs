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

        public ConfigurationService(HttpMessageHandler httpMessageHandler)
        {
            _httpClient = new HttpClient(httpMessageHandler);
        }
        public ConfigurationService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<Configuration> GetConfiguration(string serviceRegistryUrl, string service)
        {
            var response = await _httpClient.GetStringAsync(serviceRegistryUrl + "/config/" + service);
            if(!string.IsNullOrEmpty(response)) {
                return JsonConvert.DeserializeObject<Configuration>(response);
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