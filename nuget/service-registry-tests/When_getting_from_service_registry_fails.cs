using System;
using System.Collections.Generic;
using System.Net;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class When_getting_from_service_registry_fails
    {
        Establish establish = () => {
            _cache = Substitute.For<ILocalCache>();
            _cache.Read().Returns(x => { return new List<Configuration>() {
                    new Configuration() { Service = "xyz", Url = "xyzhost", Port = "1234" } }; });
            Subject = new ConfigurationService(new MockMessageHandler("", HttpStatusCode.InternalServerError), _cache);
        };

        Because of = () => _config = Subject.GetConfiguration("https://someurl", "xyz").Await();

        It should__read_local_cache = () => _cache.Received().Read();
        It should_return_the_config = () => {
            _config.Service.ShouldEqual("xyz");
            _config.Url.ShouldEqual("xyzhost");
            _config.Port.ShouldEqual("1234");
        };
        It should_not_save_local_cache = () => _cache.DidNotReceive().Save(Arg.Any<Configuration[]>());

        private static ILocalCache _cache;
        private static ConfigurationService Subject;
        private static Configuration _config;
    }
}