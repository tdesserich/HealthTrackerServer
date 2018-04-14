module.exports = function (sequelize, DataTypes) {
    return sequelize.define('incident', { 
    event: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    owner: DataTypes.INTEGER
    });
};