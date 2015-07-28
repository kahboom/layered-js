// User Model

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        username: {
            type: DataTypes.STRING(50),
            unique: true
        },
        type: {type: DataTypes.STRING(50)}, // Customers, Leads, etc.
        active: { // Not sure what we are using this for yet
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        birthday: {type: DataTypes.DATE},
        description: {type: DataTypes.TEXT},
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            validate: {
                isEmail: true
            }
        },
        firstName: {type: DataTypes.STRING(100)},
        fullName: {
            type : DataTypes.STRING(200),
            set : function(val) {
                var firstName = this.getDataValue('firstName');
                var lastName = this.getDataValue('lastName');
                //var fullName = [firstName, lastName].join(' ');

                this.setDataValue('fullName', [firstName, lastName].join(' '));
            }
        },
        hash: {type: DataTypes.STRING(255)},
        hasAdminRight: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        lastName: {type: DataTypes.STRING(100)},
        password: {type: DataTypes.STRING(75), required: false}
    });
};

