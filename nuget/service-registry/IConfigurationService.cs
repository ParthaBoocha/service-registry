using System.Threading.Tasks;

namespace service_registry
{
    public interface IConfigurationService
    {
        Task<Configuration> GetConfiguration(string serviceRegistryUrl, string service);
    }
}