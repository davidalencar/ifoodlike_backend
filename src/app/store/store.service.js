const StoreModel = require('./store.model')
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
    return await StoreModel.findOne({'name': name})
}

module.exports = service