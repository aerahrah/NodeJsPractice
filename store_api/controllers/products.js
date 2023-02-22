const Product = require('../models/product')

const getAllProductsStatic = async(req, res)=>{
    // const products = await Product.find({})
    res.status(200).json({msg: 'product route'})
}
const getAllProducts = async(req, res)=>{

    const{featured, company} = req.query;
    const queryObject={};

    if(featured){
        queryObject.featured = featured==='true' ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    let result = Product.find(queryObject);

    const products = await result;
    res.status(200).json({products});
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
