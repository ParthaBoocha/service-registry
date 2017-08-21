using System.Collections.Generic;
using System.Threading.Tasks;

namespace service_registry
{
    public interface IServiceRegistryService<T>
    {
        Task<T> Get(string serviceRegistryUrl, string key);
        Task<List<T>> GetAll(string serviceRegistryUrl);
    }
}