const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// create a middleware so you can use a sequelized object
// with all sequelize methods as detroy()
// the middleware is executed in the order it's defined in your code.
// If you define that block of code after the routes 
//then the routes will be executed first
app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user=>{
    req.user = user;
    //console.log(req.user);
    next();
  })
  .catch(err=>console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);




const Product = require('./models/product');
const User = require('./models/user');

Product.belongsTo(User, {constraints:true, onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through:CartItem}); // many to many requires at least this parameter as intermediary table
Product.belongsToMany(Cart, {through:CartItem});

sequelize
  //.sync({force:true})
  .sync()
  // create a DUMMY USER 
  .then(result => {
    return User.findByPk(1);
    
  })
  .then(user =>{
    if(!user){
      return User.create({name:'Max', email:'max@test.com'});
    }
    return user;
  })
  .then(user=>{
    return user.createCart();
    //console.log(user);
    
  })
  .then(cart=>{
    app.listen(3000);
  })

  .catch(err => {
    console.log(err);
  });
