using System.Collections.Generic;
using Machine.Specifications;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_no_configs_exist_and_getting_all
    {
        Establish establish = () =>
        {
            Subject = new ConfigurationService(new MockMessageHandler("[]"));
        };

        Because of = () => _configs = Subject.GetAll(@"http://url").Await();

        It should_return_an_empty_config = () => _configs.Count.ShouldEqual(0);

        private static ConfigurationService Subject;
        private static List<Configuration> _configs;
    }
}