var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
  port: 80
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'dist'
    }
  }
});

server.start();
