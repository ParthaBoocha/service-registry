using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Newtonsoft.Json;

[assembly: InternalsVisibleTo("service-registry-tests")]

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
            var configs = await GetAll(serviceRegistryUrl);
            var config = configs.FirstOrDefault(c => string.Compare(c.Service, service, true) == 0);

            return config ?? new Configuration();
        }

        public async Task<List<Configuration>> GetAll(string serviceRegistryUrl)
        {
            var response = string.Empty;
            try
            {
                response = await _httpClient.GetStringAsync(serviceRegistryUrl + "/configs");
            }
            catch {}
            var configs = Deserialize(response);
            if(configs.Count > 0)
            {
                try
                {
                    await _localCache.Save(Serialize(configs));
                }
                catch {}
            }
            else
            {
                try
                {
                    var content = await _localCache.Read();
                    if(!string.IsNullOrEmpty(content))
                    {
                        configs = Deserialize(content);
                    }
                }
                catch {}
            }

            return configs;
        }

        private List<Configuration> Deserialize(string content)
        {
            if(!string.IsNullOrEmpty(content)) {
                var configs = JsonConvert.DeserializeObject<Configuration[]>(content).ToList();
                return configs;
            }
            return new List<Configuration>();
        }

        private string Serialize(List<Configuration> configs)
        {
            if(configs.Count > 0)
            {
                return JsonConvert.SerializeObject(configs.ToArray());
            }
            return string.Empty;
        }
    }
}