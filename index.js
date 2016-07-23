var utils = require('./utils');
utils.initilize();
app.get('port')
var Routes = require('./routes/all');

utils.getApp().use('/plant', Routes.getRoutes());

utils.getApp().listen((process.env.PORT || 5000), function() {
  console.log("Node server running on http://localhost:3000");
  console.log("Connected to the database");
});
