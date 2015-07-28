// Product Model

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
        color: {type: DataTypes.STRING(50)},
        description: {type: DataTypes.TEXT},
        manufacturer: {type: DataTypes.STRING(100)},
        msrp: {type: DataTypes.STRING(10)},
        name: {type: DataTypes.STRING(255)},
        parentSku: {type: DataTypes.STRING(50)},
        price: {type: DataTypes.STRING(25)},
        productCare: {type: DataTypes.STRING(255)},
        size: {type: DataTypes.STRING(20)},
        sku: {type: DataTypes.TEXT},
        styleNumber: {type: DataTypes.STRING(100)},
        taxCode: {type: DataTypes.STRING(50)},
        upc: {type: DataTypes.STRING(25)}
    });
};

