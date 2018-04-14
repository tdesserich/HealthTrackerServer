module.exports = function (sequelize, DataTypes) {
    return sequelize.define('currentmed', { 
    medicationName: DataTypes.STRING,
    reason: DataTypes.STRING,
    dosage: DataTypes.STRING,
    frequency: DataTypes.STRING,
    startDate: DataTypes.STRING,
    owner: DataTypes.INTEGER
    });
};