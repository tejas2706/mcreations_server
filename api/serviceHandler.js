var _ = require('lodash');
const stream = require("stream")
function errorHandler(err, req, res) {

    var errorResponse = _.pick(err, ['customCode', 'message', 'errors']);
    console.log("Error %s -> %s", req.originalUrl, JSON.stringify(errorResponse));
    console.log(err.stack)
    res.status(err.customCode || 500).send(errorResponse);
}

function serviceHandler(req, res, serviceP) {
    serviceP.then(function(body) {
        body = _.isUndefined(body) ? {} : body;
        res.status(200).send(body);
    }).catch(function(e) {
        return errorHandler(e, req, res);
    });
}

function fileHandler(req, res, p){
    p.then(result=>{
        let fileContents =  Buffer.from(result.file)
            let readStream = new stream.PassThrough()
            readStream.end(fileContents)
            res.set("Content-disposition", 'attachment; filename=' +result.filename)
            res.set("Content-type", result.filetype)
            readStream.pipe(res)
    }).catch(function(e){
        return errorHandler(e, req, res)
    })
}
module.exports.fileHandler = fileHandler;
module.exports.serviceHandler = serviceHandler;
module.exports.errorHandler = errorHandler;
