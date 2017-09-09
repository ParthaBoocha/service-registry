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
    public class ServiceRegistryService<T> : IServiceRegistryService<T>
        where T : IConfigurationItem, new()
    {
        private readonly HttpClient _httpClient;
        private readonly ILocalCache _localCache;

        public ServiceRegistryService(HttpMessageHandler httpMessageHandler = null, ILocalCache localCache = null)
        {
            _httpClient = httpMessageHandler != null ? new HttpClient(httpMessageHandler) : new HttpClient();
            _localCache = localCache ?? new LocalFileCache() ;
        }

        public async Task<T> Get(string serviceRegistryUrl, string key)
        {
            var items = await GetAll(serviceRegistryUrl);
            var match = items.FirstOrDefault(item => string.Compare(item.Key, key, true) == 0);

            return  match != null ? match : new T();
        }

        public async Task<List<T>> GetAll(string serviceRegistryUrl)
        {
            var response = string.Empty;
            try
            {
                response = await _httpClient.GetStringAsync(serviceRegistryUrl + "/items");
            }
            catch {}
            var items = Deserialize(response);
            if(items.Count > 0)
            {
                try
                {
                    await _localCache.Save(Serialize(items));
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
                        items = Deserialize(content);
                    }
                }
                catch {}
            }

            return items;
        }

        private List<T> Deserialize(string content)
        {
            if(!string.IsNullOrEmpty(content)) {
                var items = JsonConvert.DeserializeObject<T[]>(content).ToList();
                return items;
            }
            return new List<T>();
        }

        private string Serialize(List<T> items)
        {
            if(items.Count > 0)
            {
                return JsonConvert.SerializeObject(items.ToArray());
            }
            return string.Empty;
        }
    }
}