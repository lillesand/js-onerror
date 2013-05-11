var connect = require('connect'),
    path = require('path');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.static(path.join(__dirname, 'public')))
  .use(connect.static(path.join(__dirname, '..', 'lib')))
  .listen(3000);
