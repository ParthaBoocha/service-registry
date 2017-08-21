namespace service_registry
{
    public class Configuration : IConfigurationItem
    {
        public string Service { get; set; }
        public string Url { get; set; }
        public string Port { get; set; }
        public string Key { get { return Service; } }
    }
}