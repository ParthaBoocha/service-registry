﻿using System;
using service_registry;
using Machine.Specifications;
using System.Threading.Tasks;
using System.Threading;
using System.Net;
using System.IO;

namespace service_registry_tests
{
    [Subject(typeof(ConfigurationService))]
    public class when_getting_configuration_for_a_service
    {
        Establish establish = () => {
            Subject = new ConfigurationService(new MockMessageHandler("{\"service\": \"xyz\", \"url\": \"xyzhost\", \"port\": \"1234\"}"));
        };

        Because of = () => _config = Subject.GetConfiguration(@"http://url", "xyz").Await();
        
        It should_get_service_name = () => _config.Service.ShouldEqual("xyz");
        It should_get_service_url = () => _config.Url.ShouldEqual("xyzhost");
        It should_get_service_port = () => _config.Port.ShouldEqual("1234");

        private static Configuration _config;
        private static ConfigurationService Subject;
    }
}
