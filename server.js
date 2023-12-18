const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render('index', {
    title: "Real Time Chat"
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
