module.exports = function (sequelize, DataTypes) {
    return sequelize.define('discmed', { 
    medicationName: DataTypes.STRING,
    reason: DataTypes.STRING,
    reaction: DataTypes.STRING,
    dosage: DataTypes.STRING,
    frequency: DataTypes.STRING,
    endDate: DataTypes.STRING,
    owner: DataTypes.INTEGER    
    });
};