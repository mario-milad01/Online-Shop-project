const Product = require('../models/product.model');

function getCart(req,res){
    res.render('customers/cart/cart');
}

async function addCartItem(req,res,next){
    let product;
    try{
        product = await Product.findProductById(req.body.productId);
        
    }catch(error){
        next(error);
        return;
    }
    const cart = res.locals.cart;
    cart.addItem(product);
    req.session.cart = cart;
    
    res.status(201).json({
        message:'Cart Updated!',
        newTotalItems: cart.totalQuantity
    });
}

function updateCartItem(req,res){
    const cart = res.locals.cart;
    
    const updatedPrice = cart.updateItem(req.body.productId , +req.body.newQuantity);
    req.session.cart = cart;
    res.json({
        message:'Item updated!',
        updatedCartData:{
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice:cart.totalPrice,
            updatedPrice: updatedPrice.updatedItemPrice
        },
        
    });
    
}

module.exports = {
    addCartItem:addCartItem,
    getCart:getCart,
    updateCartItem:updateCartItem
};