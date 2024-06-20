const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'hapi_sql',
  username: 'loksai',
  password: 'doodleblue@123',
  host: 'localhost', 
  dialect: 'mysql',  
});

module.exports = sequelize;