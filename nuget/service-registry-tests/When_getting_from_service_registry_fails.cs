using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ServiceRegistryService<Configuration>))]
    public class When_getting_from_service_registry_fails
    {
        Establish context = () => {
            _cache = Substitute.For<ILocalCache>();
            _cache.Read().Returns(x => { return Task.FromResult("[{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"}]"); });
            Subject = new ServiceRegistryService<Configuration>(new MockMessageHandler("", HttpStatusCode.InternalServerError), _cache);
        };

        Because of = () => _config = Subject.Get("https://someurl", "xyz").Await();

        It should__read_local_cache = () => _cache.Received().Read();
        It should_return_the_config = () => {
            _config.Service.ShouldEqual("xyz");
            _config.Url.ShouldEqual("xyzhost");
            _config.Port.ShouldEqual("1234");
        };
        It should_not_save_local_cache = () => _cache.DidNotReceive().Save(Arg.Any<string>());

        private static ILocalCache _cache;
        private static ServiceRegistryService<Configuration> Subject;
        private static Configuration _config;
    }
}