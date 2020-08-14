const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'george11.02.2014', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
