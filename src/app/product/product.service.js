const ProductModel = require('./product.model')
const service = {};


service.create = async (data) => {
    product = new ProductModel(data)
    return await product.save()
}

service.update = async (data) => {
    var product = await ProductModel.findById(data._id)
    product.overwrite(data)
    return await product.save()
}

service.delete= async (id) => {
    return await ProductModel.findByIdAndDelete(id);
}

service.control = async (data) => {
    var product = await ProductModel.findById(data.id)
    product.enable = data.enable;
    product.category = data.category;
    
    return await product.save()
}

service.getByStore = async(store) => {
    return ProductModel.find({'store': store}).select({'store': 0, '__v': 0, 'cost': 0})
}

service.getByStoreControl = async(store) => {
    return ProductModel.find({'store': store}).sort({'name': 'asc'});
}


module.exports = service