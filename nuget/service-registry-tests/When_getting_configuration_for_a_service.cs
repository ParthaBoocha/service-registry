using System;
using service_registry;
using Machine.Specifications;
using System.Threading.Tasks;
using System.Threading;
using System.Net;
using System.IO;
using NSubstitute;

namespace service_registry_tests
{
    [Subject(typeof(ServiceRegistryService<Configuration>))]
    public class when_getting_configuration_for_a_service
    {
        Establish context = () => {
            _cache = Substitute.For<ILocalCache>();
            Subject = new ServiceRegistryService<Configuration>(new MockMessageHandler("[{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"}]"),
            _cache);
        };

        Because of = () => _config = Subject.Get(@"http://url", "xyz").Await();

        It should_get_service_name = () => _config.Service.ShouldEqual("xyz");
        It should_get_service_url = () => _config.Url.ShouldEqual("xyzhost");
        It should_get_service_port = () => _config.Port.ShouldEqual("1234");
        It should_save_to_local_cache = () => _cache.Received().Save(Arg.Any<string>());

        private static Configuration _config;
        private static ILocalCache _cache;
        private static ServiceRegistryService<Configuration> Subject;
    }
}
