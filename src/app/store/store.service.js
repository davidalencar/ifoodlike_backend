const StoreModel = require('./store.model')
const productSevice = require('../product/product.service')
const service = {};

service.write = async (data) => {
    var store = await StoreModel.findOne({'name': data.name})
    if(!store){
        store = new StoreModel(data)
    } else {
        store.overwrite(data)
    }
        
    return await store.save()
}

service.getByName = async (name) => {
    var store = await StoreModel.findOne({'name': name}) 
    store.products = await productSevice.getByStore(name)

    return store
}

module.exports = service