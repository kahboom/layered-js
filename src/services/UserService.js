// User Service
'use strict';

// ---------------------- Dependencies ---->>

var UserRepository = require('../repositories/UserRepository.js');


// ---------------------- Class/Constructor ---->>

function UserService(model, modelName, params) {
    UserRepository.call(this, model, modelName, params);

    this.layerName = 'UserService';

    this.mix = function mix() {
        var arg, prop, child = {};
        for (arg = 0; arg < arguments.length; arg += 1) {
            for (prop in arguments[arg]) {
                if (arguments[arg].hasOwnProperty(prop)) {
                    child[prop] = arguments[arg][prop];
                }
            }
        }
        return child;
    };
}

// ---------------------- Prototypes ---->>

function inheritPrototype(UserService, UserRepository) {
    var prototype = Object.create(UserRepository.prototype); // Create Object
    prototype.constructor = UserService; // Augment Object
    UserService.prototype = prototype; // Assign Object
}

inheritPrototype(UserService, UserRepository);

// Set Associations
UserService.prototype.setAssociations = function setAssociations(original, cb) {};


// Unset Associations
UserService.prototype.unsetAssociations = function unsetAssociations(original, cb) {};


module.exports = UserService;
