
var express               = require("express");
var bodyParser            = require('body-parser');
var cors                  = require('cors');
var fs                    = require('fs');
var authMiddleware        = require("./authMiddleware");
var morgan                = require("morgan");
var router = express.Router()

var app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(morgan('combined', {
      skip: function (req, res) { return res.statusCode < 400; }
}));

app.get('/api/sync_time', function(req, res) {
    res.send([new Date().toISOString()]);
});

authMiddleware.init(router)
app.use(bodyParser.json());

function init(path, app) {
    var rest = path + '/rest';
    var files = fs.readdirSync(rest);

    files.forEach(function(file){
        if(['.','..'].indexOf(file) > -1 ) {
            return;
        }
        var filePath = [rest,file].join('/');
        var pathStat = fs.statSync(filePath);
        if(pathStat.isFile() && file.substr(-3) === '.js') {
            require(filePath).init(router);
        }
    });
}

app.use(config.get("app.apiPrefix"), router);

init(__dirname, app);


module.exports.start = function() {
    app.listen(process.env.API_PORT || 3000, function(err) {
        if (err) {
            console.log('Error in starting api server:', err);
        }
        console.log("api server listening on",  process.env.API_PORT || 3000);
    });
};
