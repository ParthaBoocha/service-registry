using System;
using service_registry;
using Machine.Specifications;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class when_getting_configuration_for_a_service
    {
        Because of = () => { _config = Subject.GetConfiguration("xyz").Await(); };
        It should_get_service_name = () => { _config.Service.ShouldEqual("xyz"); };
        It should_get_service_url = () => { _config.Url.ShouldEqual("xyzhost"); };
        It should_get_service_port = () => { _config.Port.ShouldEqual("1234"); };

        private static ConfigurationService Subject = new ConfigurationService(@"http://localhost:8080/config");
        private static Configuration _config;
    }
}
