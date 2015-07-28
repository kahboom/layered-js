// Authentication
'use strict';

var app = require('../../app.js');
var bcrypt = require('bcrypt');
var config = require('../../config/' + app.get('env') + '.json');
var jwt = require('jwt-simple');

var Services = require('../services/index.js');
var UserService = Services.UserService;

var auth = {
    login: function(req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);

            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });

            return;
        }

        // Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validate(username, password);

        if (!dbUserObj) { // If authentication fails, we send a 401 back
            res.status(401);

            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });

            return;
        }

        if (dbUserObj) {
            // If authentication is success, we will generate a token
            // and dispatch it to the client
            res.json(genToken(dbUserObj));
        }
    },
    validate: function(username, password) {
        // spoofing the DB response for simplicity

        /*
        var dbUserObj = { // spoofing a userobject from the DB.
            name: 'arvind',
            role: 'admin',
            username: 'arvind@myapp.com'
        };

        return dbUserObj;
        */


        var User = new UserService({where: {username: username}});

        return User
            .find()
            .then(function(user) {
                if(password === user.password) {
                    //console.log('Yay! Passwords match. Logging user in...');

                    return user;
                }
            })
            .catch(function(err) {
                console.log('Error validating user: ' + JSON.stringify(err));

                return null;
            });
        /*
        User
            .find()
            .then(function(user) {
                bcrypt.compare(password, user.hash, function(err, res) {
                    if (!res) {
                        console.log('Invalid username and/or password...');

                        return done(null, false);
                    }

                    console.log('User successfully authenticated...');
                    console.log('User: ' + JSON.stringify(user));
                    console.log('bcrypt res: ' + JSON.stringify(res));
                    //return done(null, user);

                    return user;
                });
            })
            .catch(function(err) {
                console.log('Error validating user: ' + JSON.stringify(err));

                return ('Error validating user...');
            });
            */
    },
    validateUser: function(username) {
        // spoofing the DB response for simplicity
        /*
        var dbUserObj = { // spoofing a userobject from the DB.
            name: 'arvind',
            role: 'admin',
            username: 'arvind@myapp.com'
        };
        */

        var User = new UserService({where: {username: username}});

        return User
            .find()
            .then(function(user) {
                //console.log('User: ' + JSON.stringify(user));

                return user;
            })
            .catch(function(err) {
                console.log('Error validating user: ' + JSON.stringify(err));

                return null;
            });
    }
};

// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days

    var token = jwt.encode({
        exp: expires,
        user: user
    }, config['settings']['secret']);

    return {
        token: token,
        expires: expires//,
        //user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();

    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;

