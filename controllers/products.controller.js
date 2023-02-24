const { getProductsService, postProductsService } = require("../services/product.services");


exports.postUser = async (req,res,next) =>{
    
    try {
             
        const result= await postProductsService(req)
        //this logger i got from schema. i injected this to the schema
        result.logger();
        res.status(200).json({
            status:'success',
            message:'Data inserted successfully',
            data:result
        })
    } catch (error) {
        console.log(error)
    }
}

exports.getUser= async(req,res,next)=>{
    try {
        // const products= await app.Product.find({},'-categories').sort({quantity:1});

        //mongoose way opf the above line
        // const products = await app.Product.where("name").equals('carrot');
        const product= await getProductsService();
        
        res.status(200).json({
            status:'success',
            data:product
        })

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message:"Can't get data",
            error: error.message
        })
    }
}