import session from "express-session";
import MySQLStore from "express-mysql-session";
import dotenv from "dotenv";
dotenv.config();

const SessionStore = MySQLStore(session);

export const sessionMiddleware = session({
  key: "session_id",
  secret: process.env.SESSION_SECRET,
  store: new SessionStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 8
  }
});
