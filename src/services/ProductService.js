// Product Service
'use strict';

// ---------------------- Dependencies ---->>

var ProductRepository = require('../repositories/ProductRepository.js');


// ---------------------- Class/Constructor ---->>

function ProductService(model, modelName, params) {
    // Pass Arguments to Parent Constructor
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
    // Create Temporary Object with Parent's Constructor Methods
    var prototype = Object.create(ProductRepository.prototype);

    // Augment Object; Reset the Temporary Object's Constructor
    prototype.constructor = ProductService;

    // Assign Temporary Object as Child's Prototype
    ProductService.prototype = prototype;
}

inheritPrototype(ProductService, ProductRepository);


// Find One Instance with its Associations
ProductService.prototype.findWithAssociations = function findWithAssociations(cb) {};


// Set Associations
ProductService.prototype.setAssociations = function setAssociations(original, cb) {};


module.exports = ProductService;
