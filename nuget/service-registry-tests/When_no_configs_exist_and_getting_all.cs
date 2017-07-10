using System.Collections.Generic;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_no_configs_exist_and_getting_all
    {
        Establish establish = () =>
        {
            _cache = Substitute.For<ILocalCache>();
            Subject = new ConfigurationService(new MockMessageHandler("[]"), _cache);
        };

        Because of = () => _configs = Subject.GetAll(@"http://url").Await();

        It should_return_an_empty_config = () => _configs.Count.ShouldEqual(0);
        It should_not_save_to_local_cache = () => _cache.DidNotReceive().Save(Arg.Any<Configuration[]>());

        private static ConfigurationService Subject;
        private static List<Configuration> _configs;
        private static ILocalCache _cache;
    }
}