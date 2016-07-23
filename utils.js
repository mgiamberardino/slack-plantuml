var express;
var app;
exports.initilize = function(){
  express = require("express"),
  app = express(),
  bodyParser  = require("body-parser"),
  methodOverride = require("method-override");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });
}

exports.getApp = function(){
  return app;
}

exports.getExpress = function(){
  return express;
}
