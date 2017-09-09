using System.Collections.Generic;
using Machine.Specifications;
using NSubstitute;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(ServiceRegistryService<AppSetting>))]
    public class When_getting_all_app_settings
    {
        Establish context = () =>
        {
            _cache = Substitute.For<ILocalCache>();
            Subject = new ServiceRegistryService<AppSetting>(new MockMessageHandler(
                "[{\"key\":\"setting1\",\"value\":\"xyzdfdsfsdfdsfdsf\"},"
                + "{\"key\":\"setting2\",\"value\":\"abc\"}]"
            ),
            _cache);
        };

        Because of = () => _settings = Subject.GetAll(@"http://url").Await();

        It should_return_an_empty_config = () => _settings.Count.ShouldEqual(2);
        It should_save_to_local_cache = () => _cache.Received().Save(Arg.Any<string>());

        private static ServiceRegistryService<AppSetting> Subject;
        private static List<AppSetting> _settings;
        private static ILocalCache _cache;
    }
}