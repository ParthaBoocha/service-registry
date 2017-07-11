using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace service_registry
{
    internal class LocalFileCache : ILocalCache
    {
        private static readonly string FolderPath = Path.Combine(Environment.GetEnvironmentVariable(RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "LocalAppData" : "Home"), "service-registry");

        private static readonly string FilePath = Path.Combine(FolderPath, "configs.json");

        public async Task<string> Read()
        {
            return "";
        }

        public async Task Save(string configs)
        {
            if(!Directory.Exists(FolderPath))
            {
                Directory.CreateDirectory(FolderPath);
            }
            using(var writer = File.CreateText(FilePath))
            {
                await writer.WriteAsync(configs);
            }
        }
    }
}