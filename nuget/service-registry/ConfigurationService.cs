using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace service_registry
{
    public class ConfigurationService : IConfigurationService
    {
        private readonly string _serviceRegistryUrl;
        public ConfigurationService(string serviceRegistryUrl)
        {
            _serviceRegistryUrl = serviceRegistryUrl;
        }

        public async Task<Configuration> GetConfiguration(string service)
        {
            using(var httpClient = new HttpClient())
            {
                var response = await httpClient.GetStringAsync(_serviceRegistryUrl + "/" + service);
                if(!string.IsNullOrEmpty(response)) {
                    return JsonConvert.DeserializeObject<Configuration>(response);
                }

                return new Configuration();
            }
        }
    }
}