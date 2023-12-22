const express = require("express");
const { auth, requiresAuth  } = require('express-openid-connect');
require('dotenv').config()
const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'http://localhost:3000',
  clientID: 't1CwdyLbjNxRH87l39LiqFpPZFfqttVt',
  issuerBaseURL: 'https://dev-ujpkjsx3w8xs4l1e.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
app.set("view engine", "ejs");

// req.isAuthenticated is provided from the auth router
/* app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
 */

//Express dont allow serving static files without the use of static middleware
app.use('/style',express.static(__dirname + '/style'));
app.use('/images',express.static(__dirname + '/images'));

app.get("/", function  (req, res) {
  res.render('index', {
    title: "Real Time Chat",
    cresidentials : {...req.oidc.user }
  });
});

app.get("/chat_board", function  (req, res) {
  res.render('chat_board', {
    cresidentials : {...req.oidc.user }
  });
});

app.get("/login", function (req, res) {
res.render('login')
})

app.get('/profile', requiresAuth(), (req, res) => {
  res.render('profile', {
    cresidentials : {...req.oidc.user }
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
