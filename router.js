// Router
'use strict';

module.exports = exports.router = function Route(router, app) {
    var config = require('./config/' + app.get('env') + '.json');

    // API / Data / Actions
    var api = {
        products: require('./src/api/products.js'),
        users: require('./src/api/users.js')
    };

    var auth = require('./src/api/auth.js');

    // Check if user is logged in
    var checkAuth = function(req, res, next) {
        if(config['admin']['login'] === 'off') {
            next();
        } else {
            if(req.loggedIn){
                next();
            } else {
                console.log('User is not logged in. Redirecting to login...');
                res.render('login');
            }
        }
    };

    // Check if user role is admin
    var checkAdmin = function(req, res, next) {
        if (req.user.role == 'Admin') {
            return next();
        } else {
            console.log('User is not an Admin. Redirecting to restricted error...');
            return res.render('error');
        }
    };


    // Authentication & ACL

    //router.get('/logout', routes.main.logout);

    //router.all('*', checkAuth);

    // Routes that can be accessed by any one
    router.post('/login', auth.login);


    // ---------------------- API ---->>

    //router.all('/v1/*', checkAdmin);

    router.get('/v1/products', api.products.findAll);
    router.get('/v1/products/:id', api.products.find);
    router.post('/v1/products', api.products.add);
    router.put('/v1/products/:id', api.products.save);
    router.delete('/v1/products/:id', api.products.del);


    router.get('/v1/users', api.users.findAll);
    router.get('/v1/users/:id', api.users.find);
    router.post('/v1/users', api.users.add);
    router.put('/v1/users/:id', api.users.save);
    router.delete('/v1/users/:id', api.users.del);
};
