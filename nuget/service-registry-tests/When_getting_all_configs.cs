using System.Collections.Generic;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ServiceRegistryService<Configuration>))]
    public class When_getting_all_configs
    {
        Establish context = () =>
        {
            _cache = Substitute.For<ILocalCache>();
            Subject = new ServiceRegistryService<Configuration>(new MockMessageHandler(
                "[{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"},"
                + "{\"service\": \"abc\", \"url\": \"abchost\", \"port\": \"567\"}]"
            ),
            _cache);
        };

        Because of = () => _configs = Subject.GetAll(@"http://url").Await();

        It should_return_an_empty_config = () => _configs.Count.ShouldEqual(2);
        It should_save_to_local_cache = () => _cache.Received().Save(Arg.Any<string>());

        private static ServiceRegistryService<Configuration> Subject;
        private static List<Configuration> _configs;
        private static ILocalCache _cache;
    }
}