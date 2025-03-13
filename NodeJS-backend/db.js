const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('LupisBarbershop', 'root', 'lyp1392003', {
  host: '127.0.0.1',
  dialect: 'mysql',
  loggin : false,
});

module.exports = sequelize;
