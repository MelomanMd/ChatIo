const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: 'E1250ZNIH4F5ZQOCEN4M',
  saveUninitialized: true,
  resave: true,
});