var Hapi = require('hapi');
var faker = require('faker');
var server = new Hapi.Server();
var handlebars = require('handlebars');

server.connection({
  port: 80
});


var users = [{
  firstName: 'Marguerite',
  lastName: 'Beer',
  email: 'Moises.Bednar@hotmail.com',
  bio: 'The founding member of Kindling.  Super cool person'
}, {
  firstName: 'Norberto',
  lastName: 'Adams',
  email: 'Madisyn_Weimann@gmail.com',
  bio: 'The Eve to the Adam of Kindling'
}];




server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply.file(process.cwd() + '/public/index.html');
  }
});


server.route({
  method: 'GET',
  path: '/user/',
  handler: function(request, reply) {

    reply(users)
  }
});


server.route({
  method: 'GET',
  path: '/user/{id}',
  handler: function(request, reply) {

    var id = ~~request.params.id;
    if (users[id]) {
      reply(users[id])
    } else {
      reply('no such user');
    }
  }
});


server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
});


server.start(function() {
  console.log('Kindling running on port ' + server.info.port)
});
