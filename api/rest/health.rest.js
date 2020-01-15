var serviceHandler     = require('../serviceHandler.js').serviceHandler;

module.exports.init = function (app) {
    app.get('/health', function(req, res){
        let p = Promise.resolve({"success": "ok"});
        return serviceHandler(req, res, p)
    });
};
