// Pinterest Service
'use strict';

// ---------------------- Dependencies ---->>

//var Repository = require('../repositories/index.js').PinterestRepository;


// ---------------------- Class/Constructor ---->>

function PinterestService(params) {
    this.layerName = 'PinterestService';
    this.params = params;
}

// ---------------------- Prototypes ---->>

//PinterestService.prototype = new Repository();

//PinterestService.prototype.constructor = PinterestService;

module.exports = PinterestService;
