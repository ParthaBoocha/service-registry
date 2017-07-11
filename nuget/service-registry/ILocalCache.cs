using System.Threading.Tasks;

namespace service_registry
{
    public interface ILocalCache
    {
        Task Save(Configuration[] configs);
    }
}