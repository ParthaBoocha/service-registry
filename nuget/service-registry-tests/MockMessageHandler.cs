
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace service_registry_tests
{
    internal class MockMessageHandler : HttpMessageHandler
    {
        private HttpStatusCode _statusCode;
        private string _response;

        public MockMessageHandler(string response = "{}", HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            _response = response;
            _statusCode = statusCode;
        }
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(new HttpResponseMessage(_statusCode)
            {
                Content = new StringContent(_response)
            });
        }
    }
}