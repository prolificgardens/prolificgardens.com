var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  port: 80
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.file(process.cwd() + '/dist/index.html');
  }
});

server.start(function() {
  console.log('Kindling running on port ' + server.info.port)
});
