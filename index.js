var bootstrap = require('./bootstrap.js');
var config = require('./config');
bootstrap.init(config).then( ()=> {
    var app = require("./api")
    app.start();
});


