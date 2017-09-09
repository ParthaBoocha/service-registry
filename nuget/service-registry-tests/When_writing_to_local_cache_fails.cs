using System;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ServiceRegistryService<Configuration>))]
    public class When_writing_to_local_cache_fails
    {
        Establish context = () => {
            _cache = Substitute.For<ILocalCache>();
            _cache.Save(Arg.Any<string>()).Returns(x => { throw new Exception("some error"); });
            Subject = new ServiceRegistryService<Configuration>(new MockMessageHandler("[{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"}]"), _cache);
        };

        Because of = () => _config = Subject.Get("https://someurl", "xyz").Await();

        It should_return_the_config = () => {
            _config.Service.ShouldEqual("xyz");
            _config.Url.ShouldEqual("xyzhost");
            _config.Port.ShouldEqual("1234");
        };
        It should_have_attempted_to_save = () => _cache.Received().Save(Arg.Any<string>());

        private static ILocalCache _cache;
        private static ServiceRegistryService<Configuration> Subject;
        private static Configuration _config;
    }
}