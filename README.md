# service-registry
Service configuration and discovery

## Start server
`yarn server`

## Usage
### Get
`curl http://localhost:8080/config/foo` where `foo` is the service name
`curl http://localhost:8080/config` to get all configs
### PUT/POST
`curl -H "Content-Type: application/json" -X POST -d '{"service":"xyz","url":"xyz","port":"1234"}' http://localhost:8080/config`