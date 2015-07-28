// Product Service
'use strict';

// ---------------------- Dependencies ---->>

var ProductRepository = require('../repositories/ProductRepository.js');


// ---------------------- Class/Constructor ---->>

function ProductService(model, modelName, params) {
    ProductRepository.call(this, model, modelName, params);

    this.layerName = 'ProductService';

    //this.params = params;

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
    }
}

// ---------------------- Prototypes ---->>

function inheritPrototype(ProductService, ProductRepository) {
    var prototype = Object.create(ProductRepository.prototype); // Create Object
    prototype.constructor = ProductService; // Augment Object
    ProductService.prototype = prototype; // Assign Object
}

inheritPrototype(ProductService, ProductRepository);

// Find All with Each of its Associations
ProductService.prototype.findAllWithAssociations = function findAllWithAssociations(cb) {};

// Find One Instance with its Associations
ProductService.prototype.findWithAssociations = function findWithAssociations(cb) {};


// Set Associations
ProductService.prototype.setAssociations = function setAssociations(original, cb) {};

module.exports = ProductService;
