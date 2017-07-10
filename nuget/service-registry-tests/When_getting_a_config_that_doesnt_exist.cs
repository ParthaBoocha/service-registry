using System.Threading.Tasks;
using Machine.Specifications;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_getting_a_config_that_doesnt_exist
    {
        Establish establish = () =>
        {
            Subject = new ConfigurationService(new MockMessageHandler());
        };

        Because of = () => _emptyConfig = Subject.GetConfiguration(@"http://url", "service that doesn't exist").Await();

        It should_return_an_empty_config = () => _emptyConfig.Service.ShouldBeNull();

        private static ConfigurationService Subject;
        private static Configuration _emptyConfig;
    }
}