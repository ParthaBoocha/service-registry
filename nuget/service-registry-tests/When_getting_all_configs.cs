using System.Collections.Generic;
using Machine.Specifications;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_getting_all_configs
    {
        Establish establish = () =>
        {
            Subject = new ConfigurationService(new MockMessageHandler(
                "[{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"},"
                + "{\"service\": \"abc\", \"url\": \"abchost\", \"port\": \"567\"}]"
            ));
        };

        Because of = () => _configs = Subject.GetAll(@"http://url").Await();

        It should_return_an_empty_config = () => _configs.Count.ShouldEqual(2);

        private static ConfigurationService Subject;
        private static List<Configuration> _configs;
    }
}