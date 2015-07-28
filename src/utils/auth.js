// Everyauth Configuration
'use strict';

/*
This file configures the user authentication module Everyauth.
 */

module.exports = function (root, everyauth) {
    var bcrypt = require('bcrypt');

    var Models = require('../models/index.js');
    var models = new Models();

    var User = models.User;

    everyauth.debug = true;

    everyauth.everymodule.findUserById(function (req, id, callback) {
        User
            .find(id)
            .success(function(user){
                callback(null, user);
            })
            .error(function(err){
                console.log("Error in Lookup: " + err);
                return callback(err);
            });
    });

    everyauth.password
        .getLoginPath('/login') // Uri path to the login page
        .postLoginPath('/login') // Uri path that your login form POSTs to
        .loginView('login')
        .authenticate(function(login, password) {
            var promise = this.Promise();
            User
                .find({ where: {username: login} })
                .success(function(user) {
                    bcrypt.compare(password, user.password, function(err, res) {
                        if (!res) {
                            console.log('Invalid username and/or password...');
                            res.render('error');
                            return done(null, false);
                        }
                        console.log('User successfully authenticated...');
                        //return done(null, user);
                        return promise.fulfill(user);
                    });
                })
                .error(function(err) {
                    // Ooops, do some error-handling
                    console.log('Error authenticating user: ' + err);
                    promise.fulfill([err]);
                });
            return promise;
        })
        .loginSuccessRedirect('/') // Where to redirect to after a login
        .getRegisterPath('/register') // Uri path to the registration page
        .postRegisterPath('/register') // The Uri path that your registration form POSTs to
        .registerView('users/register')
        .extractExtraRegistrationParams( function (req) {
            return {
                confirmPassword: req.body.confirmPassword,
                username: req.body.username,
                email: req.body.email
            };
        })
        .validateRegistration( function (newUserAttributes, errors) {
            // Validate the registration input
            console.log('validateRegistration' + JSON.stringify(newUserAttributes));
            if (newUserAttributes.confirmPassword != newUserAttributes.password) errors.push('Password is incorrect');
            return errors;
        })
        .registerUser( function (newUserAttributes) {
            console.log('registerUser' + JSON.stringify(newUserAttributes));
            var promise = this.Promise();
            console.log("Hashing password with bcrypt...");
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(newUserAttributes.password, salt);
            User
                .create({
                    username: newUserAttributes.username,
                    name: newUserAttributes.name,
                    email: newUserAttributes.email,
                    password: hash
                })
                .success(function(user) {
                    // create user success
                    console.log(user.values); //
                    promise.fulfill(user);
                })
                .error(function(err) {
                    // Ooops, do some error-handling
                    promise.fulfill([err]);
                });
            return promise;
        })
        .registerSuccessRedirect('/'); // Where to redirect to after a successful registration


    /* for connect with facebook and login */
    everyauth.facebook
        .appId('')
        .appSecret('')
        .entryPath('/auth/facebook')
        .callbackPath('/auth/facebook/callback')
        .scope('email')
        .handleAuthCallbackError( function (req, res) {
            // If a user denies your app, Facebook will redirect the user to
            // /auth/facebook/callback?error_reason=user_denied&error=access_denied&error_description=The+user+denied+your+request.
            // This configurable route handler defines how you want to respond to
            // that.
            // If you do not configure this, everyauth renders a default fallback
            // view notifying the user that their authentication failed and why.
        })
        .findOrCreateUser( function (session, accessToken, accessTokExtra, fbUserMetadata) {
            // find or create user logic goes here
            console.log("fbUserMetadata : " + JSON.stringify(fbUserMetadata));
            var promise = this.Promise();

            User
                .findAll({where: {facebookid: fbUserMetadata.id}})
                .success(function(user) {
                    // console.log('findall:'+JSON.stringify(user));
                    if(user.length == 0){
                        console.log('without this user');

                        User
                            .create({
                                username: fbUserMetadata.name,
                                email: fbUserMetadata.email,
                                facebookId: fbUserMetadata.id,
                                count: 0
                            })
                            .success(function(new_user) {
                                // create user success
                                promise.fulfill(new_user);
                            })
                    }
                    else{
                        promise.fulfill(user[0]);
                    }
                });

            return promise;
        })
        .redirectPath('/');

    /* for logout */
    everyauth.everymodule.logoutPath('/logout');
    everyauth.everymodule.logoutRedirectPath('/');
    everyauth.everymodule.handleLogout( function (req, res) {
        // Put you extra logic here
        console.log('Successfully logged out user...');
        req.logout(); // The logout method is added for you by everyauth, too

        // And/or put your extra logic here

        this.redirect(res, this.logoutRedirectPath());
    });
};
