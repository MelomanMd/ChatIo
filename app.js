const express 	   = require('express');
const app  		     = express();
const path 		     = require('path');
const bodyParser   = require('body-parser');
const flash 		   = require('connect-flash');
const routes       = require('./app/routes');
const passport     = require('./app/auth');
const server       = require('http').createServer(app);
const session      = require('express-session');
const port         = process.env.PORT || 3010;
const MongoStore   = require('connect-mongo');
const config       = require('./app/config');
const sessionStore = MongoStore.create({ mongoUrl: 'mongodb+srv://main:main@cluster0.q6tys.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', ttl: 60 * 60 * 1000 });

/**
 * Views config
 */
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

/**
 * Body parser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Static folders
 */
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/public/uploads'));

/**
 * Session
 */
app.use(session({
  resave: true,
  key: 'express.sid',
  store: sessionStore,
  saveUninitialized: true,
  secret: config.sessionSecret,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/**
 * Routes
 */
app.use('/', routes);

/**
 * 404 page
 */
app.use((req, res, next) => {
  res.status(404).sendFile(process.cwd() + '/app/views/404.htm');
});

/**
 * Socket
 */
require('./app/socket/chat')(server, sessionStore);

server.listen(port, () => {
  console.log('Inited on: ', port);
});
