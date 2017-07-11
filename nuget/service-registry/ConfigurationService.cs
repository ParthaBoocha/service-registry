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
            if(!string.IsNullOrEmpty(response)) {
                var configs = JsonConvert.DeserializeObject<Configuration[]>(response).ToList();
                if(configs.Count > 0)
                {
                    try
                    {
                        await _localCache.Save(configs.ToArray());
                    }
                    catch {}
                    return configs;
                }
            }
            else
            {
                return await _localCache.Read();
            }

            return new List<Configuration>();
        }
    }
}