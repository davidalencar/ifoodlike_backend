const ProductModel = require('./product.model')
const service = {};

service.write = async (data) => {
    var product = await ProductModel.findById(data._id)
    if(!product){
        product = new ProductModel(data)
    } else {
        product.overwrite(data)
    }
        
    return await product.save()
}

service.getByStore = async(store) => {
    return ProductModel.find({'store': store}).select({'store': 0, '__v': 0})
}



module.exports = service