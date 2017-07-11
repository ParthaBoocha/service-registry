using System.Collections.Generic;
using System.Threading.Tasks;

namespace service_registry
{
    public interface ILocalCache
    {
        Task<string> Read();
        Task Save(string configs);
    }
}