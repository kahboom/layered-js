// Product Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function ProductRepository(params) {
    // Instantiate new Models Layer
    var Model = new Models();

    // Local Public Members
    this.layerName = 'ProductRepository';
    this.model = Model.Product;
    this.modelName = 'Product';
    this.params = params;
}

// Inherit from BaseRepository
// Here we are isolating the inheritance functionality into a function.
function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;

    // Assign child prototype to F constructor
    Child.prototype = new F();

    // Reset the child prototype
    Child.prototype.constructor = Child;

    // The uber method here is just sugar that Douglas Crockford creates to
    // access the parent implementation of a method by reference.
    Child.uber = Parent.prototype;
}

extend(ProductRepository, BaseRepository);

// You can add any custom methods for ProductRepository here, if you'd like.
// You can also override any of the BaseRepository methods.

module.exports = ProductRepository;
