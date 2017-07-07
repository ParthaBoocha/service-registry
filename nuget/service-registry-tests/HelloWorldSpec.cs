using System;
using service_registry;
using Machine.Specifications;

namespace service_registry_tests
{
    [Subject(typeof(HelloWorld))]
    public class when_saying_hello
    {
        It should_say_hello_world = () => { new HelloWorld().SayHello().ShouldEqual("Hello World"); };
    }

    [Subject(typeof(HelloWorld))]
    public class failing_spec
    {
        It should_say_hello_universe = () => { new HelloWorld().SayHello().ShouldEqual("Hello Universe"); };
    }
}
