var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const fs = require("fs");

const notesRouter = require("./routes/notes");
const authRouter = require("./routes/auth");

var app = express();

console.log("Сборка: ", app.get("env"));
switch (app.get("env")) {
  case "development":
    app.use(morgan("dev"));
    break;
  case "production":
    const stream = fs.createWriteStream(__dirname + "/access.log", {
      flags: "a",
    });
    app.use(morgan("combined", { stream }));
    break;
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/auth", authRouter);

module.exports = app;
