using System;
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
            var response = await _httpClient.GetStringAsync(serviceRegistryUrl + "/" + service);
            if(!string.IsNullOrEmpty(response)) {
                return JsonConvert.DeserializeObject<Configuration>(response);
            }

            return new Configuration();
        }
    }
}