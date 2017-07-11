using System.Collections.Generic;
using Machine.Specifications;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(LocalFileCache))]
    public class When_caching_locally
    {
        Because of = () => Subject.Save("[{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"}]").Await();

        It should_write_settings_to_the_file = () => true.ShouldBeTrue();

        private static LocalFileCache Subject = new LocalFileCache();
    }
}