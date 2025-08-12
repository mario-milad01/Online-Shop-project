const Product = require('../models/product.model');
const Order = require('../models/order.model');


async function getProducts(req,res,next){
    try{
        const products = await Product.findAll();
        res.render('admins/products/all-products',{products:products});
    }catch(error){
        next(error);
        return;
    }
    
}
function getNewProduct(req,res){
    res.render('admins/products/new-product');
}
async function createNewProduct(req,res,next){
    const product = new Product({
        ...req.body,
        image:req.file.filename
    });
    try{
        await product.save();
    }catch(error){
        next(error);
        return;
    }
    
    res.redirect('/admins/products');
}
async function getUpdateProduct(req,res,next){
    try{
        const product = await Product.findProductById(req.params.id);
        res.render('admins/products/update-product',{product:product});
    }catch(error){
        next(error);
    }
}
async function updateProduct(req,res,next){
    const product = new Product({
        ...req.body,
        _id:req.params.id
    });
    if(req.file){
        product.replaceImage(req.file.filename);
    }
    try{
        await product.save();
    }catch(error){
        next(error);
        return;
    }
    res.redirect('/admins/products');
}

async function deleteProduct(req,res,next){
    let product;
    try{
        product = await Product.findProductById(req.params.id);
        await product.remove();
    }catch(error){
        next(error);
        return;
    }
    
    res.json({message: 'Deleted product!'});

}
async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render('admins/orders/admin-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;

    try {
        const order = await Order.findById(orderId);

        order.status = newStatus;

        await order.saveOrders();

        res.json({ message: 'Order updated', newStatus: newStatus });
    } catch (error) {
        next(error);
    }
}

module.exports={
    getProducts:getProducts,
    getNewProduct:getNewProduct,
    createNewProduct:createNewProduct,
    getUpdateProduct:getUpdateProduct,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct,
    getOrders: getOrders,
    updateOrder: updateOrder
}