namespace service_registry
{
    public class AppSetting : IConfigurationItem
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}