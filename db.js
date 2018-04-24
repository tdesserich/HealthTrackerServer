const Sequelize = require('sequelize');
  
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',  
    port: 5432
});
     
sequelize.authenticate().then(
    function() { 
        console.log('Connected to healthtracker postgres database');
    },
    function(err){ 
        console.log(err);
    }
);
                
module.exports = sequelize;