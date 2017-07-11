using System.Collections.Generic;
using System.Threading.Tasks;

namespace service_registry
{
    public interface ILocalCache
    {
        Task Save(Configuration[] configs);
        Task<List<Configuration>> Read();
    }
}