using System.Threading.Tasks;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_getting_a_config_that_doesnt_exist
    {
        Establish context = () =>
        {
            _cache = Substitute.For<ILocalCache>();
            Subject = new ConfigurationService(new MockMessageHandler(), _cache);
        };

        Because of = () => _emptyConfig = Subject.GetConfiguration(@"http://url", "service that doesn't exist").Await();

        It should_return_an_empty_config = () => _emptyConfig.Service.ShouldBeNull();
        It should_not_save_to_local_cache = () => _cache.DidNotReceive().Save(Arg.Any<string>());

        private static ConfigurationService Subject;
        private static Configuration _emptyConfig;
        private static ILocalCache _cache;
    }
}