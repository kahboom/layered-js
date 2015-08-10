// Base Repository
'use strict';

// ---------------------- Dependencies ---->>


// ---------------------- Base Class ---->>

// The BaseRepository constructor should always be empty,
// otherwise properties defined here will be added to the prototype chain.
// We only want to use the child constructor's properties in this case (`<name>Repository`).
// Add any reusable properties to one of its prototype methods.
// The parent will never be modified once the child is,
// because only the parent’s prototypes are inherited.
function BaseRepository() {}


// ---------------------- Prototypes ---->>

// Convert to a String
BaseRepository.prototype.toString = function toString(done) {
    var result = [];

    if (this.constructor.uber) {
        result[result.length] = this.constructor.uber.toString();
    }

    result[result.length] = this.layerName;

    if (done && typeof(done) === "function") {
        done(result.join(', '));
    } else {
        return result.join(', ');
    }
};

// Build It!
BaseRepository.prototype.build = function build() {
    var Model = this.model,
        params = this.params;

    return Model.build(params);
};

// Make a Bunch!
BaseRepository.prototype.bulkCreate = function create() {
    var Model = this.model,
        params = this.params;

    return Model.bulkCreate(params);
};

// Count It!
BaseRepository.prototype.count = function count() {
    var Model = this.model,
        params = this.params;

    return Model.count({where: params});
};

// Make It!
BaseRepository.prototype.create = function create() {
    var Model = this.model,
        params = this.params;

    return Model.create(params);
};

// Destroy It!
BaseRepository.prototype.destroy = function destroy() {
    var Model = this.model,
        params = this.params;

    return Model.find({where: params})
        .then(function (found) {
            return found.destroy(found);
        });
};

// Find One By Any Number of Parameters Passed
BaseRepository.prototype.find = function find() {
    var Model = this.model,
        params = this.params;

    return Model.find(params);
};

// Find All
BaseRepository.prototype.findAll = function findAll() {
    var Model = this.model,
        params = this.params;

    return Model.findAll(params);
};

// Find All and Return All and the Count
BaseRepository.prototype.findAndCountAll = function findAndCountAll() {
    var Model = this.model,
        params = this.params;
    return Model.findAndCountAll({where: params});
};

// Find or Create
BaseRepository.prototype.findOrCreate = function findOrCreate() {
    var Model = this.model,
        params = this.params;

    return Model.findOrCreate({where: params.where, defaults: params.defaults});
};

// Return the Max
BaseRepository.prototype.max = function max() {
    var Model = this.model,
        params = this.params;

    return Model.max({where: params});
};

// Return the Min
BaseRepository.prototype.min = function min() {
    var Model = this.model,
        params = this.params;

    return Model.min({where: params});
};

// Find One with Specified Association IDs via Query Parameters
BaseRepository.prototype.query = function query() {
    var Model = this.model,
        params = this.params,

    // May Not Need This!
        query = 'SELECT * FROM ? ' +
            'LEFT JOIN `User` ON `Task`.`userid` = `User`.`id` ' +
            'WHERE `User`.`last_name` = %s';

    return Model.query(params.query)
};

// Save It!
BaseRepository.prototype.save = function save() {
    var Model = this.model,
        params = this.params;

    return Model.find({where: {id: params.id}});
};

// Return the Sum
BaseRepository.prototype.sum = function sum() {
    var Model = this.model,
        params = this.params;

    return Model.sum({where: params});
};

// Update Attributes
BaseRepository.prototype.updateAttributes = function updateAttributes() {
    var Model = this.model,
        params = this.params;

    return Model.find(params);
};

// Create or Update It
BaseRepository.prototype.upsert = function upsert() {
    var Model = this.model,
        params = this.params;

    return Model.upsert(params);
};


module.exports = BaseRepository;

