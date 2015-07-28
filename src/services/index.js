// Services
'use strict';

/*
Services act as an intermediary between the controllers layer and the repositories layer.
This file imports each service file and exports them for external use.
 */

// ---------------------- Services ---->>

exports.PinterestService = require('./PinterestService.js');
exports.ProductService = require('./ProductService.js');
exports.UserService = require('./UserService.js');


