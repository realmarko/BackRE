var BaseController = require("./basecontroller"),
_ = require("underscore"),
swagger = require("swagger-node-restify")

function Users(){

}

Users.prototype = new BaseController()

module.exports = function(lib){
    var controller = new Books();
    //Helper function for the POST action
    controller.addAction({
        'path':'',
        'method':'',
        'summary':'',
        "params":[swagger.queryParam('q','Search term','string'),
    swagger.queryParam['genre','Filter by genre','string']],
    })
}