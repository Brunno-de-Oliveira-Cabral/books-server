const express = require("express");
const middleware = express();

middleware.use(express.json());

module.exports = middleware;
