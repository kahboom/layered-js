// API Server

// ---------------------- Dependencies ---->>
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');
var methodOverride = require('method-override');


// ---------------------- Other Initialization Tasks ---->>
var app = module.exports = express();
var router = express.Router();
var routes = require('./router.js');
var config = require(__dirname + '/config/' + app.get('env') + '.json');

// Synchronize Models & Initialize Connection
var Models = require(__dirname + '/src/models/index.js');
var models = new Models();

models.sequelize.sync().then(function() {
    return console.log('Database successfully synced.');
});


// ---------------------- Express ---->>
app.set('title', config['settings']['title']);
app.set('port', process.env.PORT || config['settings']['port']);
app.enable('trust proxy');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('connect-multiparty')());
app.use(methodOverride());

// Handle CORS
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-Type,Accept,X-Access-Token,X-Key,X-Requested-With');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// Auth Middleware - This will check if the token is valid
app.all('/v1/*', [require(__dirname + '/src/api/middlewares/validateRequest')]);


// Set up Routes
routes(router, app);
app.use(router);


// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



// ---------------------- Start Up Server ---->>
app.listen(app.get('port'), function() {
    console.log('API is listening on port ' + app.get('port') + ' in ' + app.get('env') + ' mode.');
});

