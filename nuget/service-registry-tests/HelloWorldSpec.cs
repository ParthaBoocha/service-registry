using System;
using service_registry;
using Machine.Specifications;

namespace service_registry_tests
{
    [Subject(typeof(HelloWorld))]
    public class when_saying_hello
    {
        It should_say_hello_world = () => { new HelloWorld().SayHello(); };
    }
}
