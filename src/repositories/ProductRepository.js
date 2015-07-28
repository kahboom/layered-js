// Product Repository
'use strict';

// ---------------------- Dependencies ---->>

var BaseRepository = require('./BaseRepository.js');
var Models = require('../models/index.js');


// ---------------------- Class/Constructor ---->>

function ProductRepository(params) {
    // Instantiate new Models Layer
    var Model = new Models();

    this.layerName = 'ProductRepository';
    this.model = Model.Product;
    this.modelName = 'Product';
    this.params = params;
}

// Inherit from BaseRepository
function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

extend(ProductRepository, BaseRepository);

module.exports = ProductRepository;
