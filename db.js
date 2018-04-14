const Sequelize = require('sequelize');
  
const sequelize = new Sequelize('healthtracker', 'postgres', 'okinawa96', {
    host: 'localhost', 
    dialect: 'postgres'  
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