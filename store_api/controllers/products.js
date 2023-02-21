// const Product = require('../models/product')
const getAllProductsStatic = async(req, res)=>{
    res.send("hello world")
}
const getAllProducts = async(req, res)=>{
    res.send("hello world")
}

module.exports ={
    getAllProducts,
    getAllProductsStatic,
};