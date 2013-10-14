var express = require('express'),
    config = require('./config'),
    merchantRoutes = require('./merchantRoutes'),
    stockManager = require('./stockManager'),
    http = require('http'),
    path = require('path');

var app = express();

function signupRoutes(appServer) {
    appServer.get('/catalog', merchantRoutes.listResources);
    appServer.get('/catalog/:id', merchantRoutes.getResourcePrice);
    appServer.post('/catalog/:id/buy', merchantRoutes.buyResource);

    appServer.post('/catalog', merchantRoutes.addCatalogItem);
    appServer.delete('/catalog/:id', merchantRoutes.removeCatalogItem);

}

function start() {
    app.configure(function () {
        app.set('port', process.env.PORT || config.merchant.port);
        app.use(express.logger('dev'));
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
    });

    app.configure('development', function () {
        app.use(express.errorHandler());
    });

    signupRoutes(app);

    http.createServer(app).listen(app.get('port'), function () {
        console.log("Express server listening on port " + app.get('port'));
    });
}

start();
stockManager.start();