using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;

namespace service_registry
{
    internal class LocalFileCache : ILocalCache
    {
        // private static readonly string FolderPath = Path.Combine(Environment.GetEnvironmentVariable(RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "LocalAppData" : "Home"), "service-registry");
        private static readonly string FolderPath = Path.Combine("~", "service-registry");

        private static readonly string FilePath = Path.Combine(FolderPath, "configs.json");

        public async Task<string> Read()
        {
            Console.WriteLine("Reading from file: " + FilePath);
            if(!File.Exists(FilePath))
            {
                return string.Empty;
            }

            return File.ReadAllText(FilePath);
        }

        public async Task Save(string configs)
        {
            Console.WriteLine("Writing to file: " + FilePath);
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