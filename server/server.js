var connect = require('connect');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(connect.static('../lib'))
  .listen(3000);
