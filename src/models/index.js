// Models

// ---------------------- Dependencies & Setup ---->>

//var config = require('../utils/config');
var Sequelize = require('sequelize');

console.log('Initializing database connection...');

var app = require('../../app.js');
var config = require('../../config/' + app.get('env') + '.json');


// ---------------------- Database Initialization ---->>

var sequelize = new Sequelize(config['db']['database'], config['db']['username'], config['db']['password'], {
    logging: console.log,
    host: config['db']['options']['host'],
    port: config['db']['options']['port'],
    protocol: config['db']['options']['protocol'],
    maxConcurrentQueries: config['db']['options']['maxConcurrentQueries'],
    dialect: config['db']['options']['dialect'],
    omitNull: config['db']['options']['omitNull'],
    native: config['db']['options']['native'],
    define: {
        underscored: config['db']['options']['define']['underscored'],
        freezeTableName: config['db']['options']['define']['freezeTableName'],
        syncOnAssociation: config['db']['options']['define']['syncOnAssociation'],
        charset: config['db']['options']['define']['charset'],
        collate: config['db']['options']['define']['collate'],
        timestamps: config['db']['options']['define']['timestamps']
    },
    sync: {
        force: config['db']['options']['sync']['force']
    },
    syncOnAssociation: config['db']['options']['syncOnAssociation'],
    pool: {
        maxConnections: config['db']['options']['pool']['maxConnections'],
        maxIdleTime: config['db']['options']['pool']['maxIdleTime']
    },
    language: config['db']['options']['language']
});



// ---------------------- Models ---->>

function Models() {
    if(config['orm'] == 'Sequelize') {
        var Product = sequelize.import(__dirname + '/Product/sequelize.js');
        var User = sequelize.import(__dirname + '/User/sequelize.js');
    }

    return {
        sequelize: sequelize,
        Product: Product,
        User: User
    };
}

module.exports = Models;

// Export Individual Database Connections
exports.sequelize = sequelize;
