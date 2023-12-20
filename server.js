const express = require("express");
const app = express();

app.set("view engine", "ejs");

//Express dont allow serving static files without the use of static middleware
app.use('/style',express.static(__dirname + '/style'));
app.use('/images',express.static(__dirname + '/images'));

app.get("/", function (req, res) {
  res.render('index', {
    title: "Real Time Chat"
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
