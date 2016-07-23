var utils = require('../utils');
var express = utils.getExpress();
var PlantCtrl = require('../controllers/plantuml');

exports.getRoutes = function(){
  var routes = express.Router();

  routes.route('/png')
    .post(PlantCtrl.generatePng);

  routes.route('/svg')
    .post(PlantCtrl.generateSvg);

  return routes;
}
