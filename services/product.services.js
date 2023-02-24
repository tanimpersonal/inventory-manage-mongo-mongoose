const Product= require("../models/Product");
exports.getProductsService=async () => {    
    const products= await Product.find({});
    return products
}

exports.postProductsService=async(req)=>{
   const products= await Product.create(req.body);
   return products
}