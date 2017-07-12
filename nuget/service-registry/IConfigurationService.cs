using System.Collections.Generic;
using System.Threading.Tasks;

namespace service_registry
{
    public interface IConfigurationService
    {
        Task<Configuration> GetConfiguration(string serviceRegistryUrl, string service);
        Task<List<Configuration>> GetAll(string serviceRegistryUrl);
    }
}