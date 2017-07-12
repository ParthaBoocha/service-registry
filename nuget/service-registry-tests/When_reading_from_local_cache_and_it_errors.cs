using System;
using System.Net;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_reading_from_local_cache_and_it_errors
    {
        Establish context = () =>
        {
            _cache = Substitute.For<ILocalCache>();
            _cache.When(x => x.Read()).Do(x => { throw new Exception("some error"); });
            Subject = new ConfigurationService(new MockMessageHandler("", HttpStatusCode.InternalServerError), _cache);
        };

        Because of = async () => _config = await Subject.GetConfiguration("http://someurl", "xyz");

        It should_attempt_to_read_from_local_cache = () => _cache.Received().Read();
        It should_return_an_empty_config = () => _config.Service.ShouldBeNull();

        private static ILocalCache _cache;
        private static ConfigurationService Subject;
        private static Configuration _config;
    }
}