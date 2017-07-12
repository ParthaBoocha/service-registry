using System.Threading.Tasks;
using Machine.Specifications;
using service_registry;

namespace service_registry_tests
{
    [Subject(typeof(LocalFileCache))]
    public class When_reading_from_local_cache
    {
        Establish context = async () => await Subject.Save("File contents");

        Because of = async () => _text = await Subject.Read();

        It should_read_file_contents = () => _text.ShouldEqual("File contents");

        private static LocalFileCache Subject = new LocalFileCache();
        private static string _text;
    }
}