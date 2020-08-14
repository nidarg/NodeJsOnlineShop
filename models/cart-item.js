const Sequelize = require('sequelize');

const sequelize = require('../util/database');

// is a combination between product, id, and quantity
// also based on associations between cart and product-> MANy TO MANY,
// this model will represent an intermediary table which holds productId and cartId 

const CartItem = sequelize.define('cart-item', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity:Sequelize.INTEGER
});

module.exports = CartItem;
