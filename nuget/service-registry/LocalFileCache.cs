using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace service_registry
{
    internal class LocalFileCache : ILocalCache
    {
        private static readonly string FilePath = Path.Combine(Environment.GetEnvironmentVariable(RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "LocalAppData" : "Home"), "service-registry", "configs.json");

        public async Task Save(Configuration[] configs)
        {
            using(var writer = File.CreateText(FilePath))
            {
                await writer.WriteAsync(JsonConvert.SerializeObject(configs));
            }
        }
    }
}