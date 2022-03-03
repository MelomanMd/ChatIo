var express 	 = require('express');
var app  		   = express();
var path 		   = require('path');
var bodyParser = require('body-parser');
var flash 		 = require('connect-flash');
var config     = require('./app/config');
var routes 		 = require('./app/routes');
var session 	 = require('./app/session');
var passport   = require('./app/auth');
var server     = require('http').createServer(app);
var io         = require('socket.io')(server);
var ioServer 	 = require('./app/socket/chat');

var port = process.env.PORT || 3010;


app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/public/uploads'));


app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

io.use(function(socket, next) {
  passport.session()(socket.request, socket.request.res, next);
});

ioServer.initIo(io);


server.listen(port, () => {
  console.log('Inited on:', port);
});
// ioServer.init(app).listen(port);