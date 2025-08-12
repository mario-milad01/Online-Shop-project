require('dotenv').config();

const express = require('express');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const cartMiddleware = require('./middlewares/cart');
const path = require('path');
const app = express();
const db = require('./data/database');
const expressSession = require('express-session');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const cartRoutes = require('./routes/cart.routes');
const createSessionConfig = require('./config/session');
const adminRoutes = require('./routes/admins.routes');
const ordersRoute = require('./routes/orders.routes');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notFoundMiddleware = require('./middlewares/not-found');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());



const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(express.static('public'));
app.use('/products/assets', express.static('product-data'));
app.use(checkAuthStatusMiddleware);
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);
app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart',cartRoutes);

app.use(protectRoutesMiddleware);
app.use('/orders',ordersRoute);
app.use('/admins',adminRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


// db.connect().then(function(){
//     console.log("Database connected successfully.");
// }).catch(function(error){
//     console.log('Failed to connect to the database!');
//     console.log(error);
// });
module.exports = app;