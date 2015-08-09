// Product Service
'use strict';

// ---------------------- Dependencies ---->>

var ProductRepository = require('../repositories/ProductRepository.js');


// ---------------------- Class/Constructor ---->>

function ProductService(model, modelName, params) {
    // Pass Arguments to Parent Constructor:
    // We do this to assign it a new `this` object using these arguments
    ProductRepository.call(this, model, modelName, params);

    // Public Member:
    // Replace the layerName inherited from the parent class
    this.layerName = 'ProductService';

    // An Example Optional Public Helper Function:
    // Use this if you want to combine the properties
    // of multiple objects into one final object.
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

// Here we are using Parasitic Combination Inheritance to inherit properties
// and methods of another class. In this case, it's the `ProductRepository` class
// from the Repository layer.

function inheritPrototype(ProductService, ProductRepository) {
    // Create Temporary Object with Parent's Constructor Methods
    var prototype = Object.create(ProductRepository.prototype);

    // Augment Object; Reset the Temporary Object's Constructor
    prototype.constructor = ProductService;

    // Assign Temporary Object as Child's Prototype:
    // Now the `ProductService` class will have access to it's parent's prototype chain.
    ProductService.prototype = prototype;
}

// Call inheritPrototype()
// Now our Child class `ProductService` has inherited the `ProductRepository` prototype chain
// YAY! :D
inheritPrototype(ProductService, ProductRepository);


// Custom Prototype Methods:
// Now we can assign custom methods that are specific to this child constructor `ProductService`
// without worrying about it being overridden by the parent constructor's prototype chain.
// Always make sure that they are defined AFTER the call to inheritPrototype() or
// they will be overridden.

// Find One Instance with its Associations
ProductService.prototype.findWithAssociations = function findWithAssociations(cb) {};


// Set Associations
ProductService.prototype.setAssociations = function setAssociations(original, cb) {};


// Export the ProductService class to be used by the controllers/API methods
module.exports = ProductService;
