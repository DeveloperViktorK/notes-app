const axios = require("axios");
const config = require("config");

const urlAx = "".concat(
  config.get("axios.protocol"),
  "://",
  config.get("axios.host"),
  ":",
  config.get("axios.port"),
  "/"
);

const instance = axios.create({
  baseURL: urlAx,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

module.exports = instance;
