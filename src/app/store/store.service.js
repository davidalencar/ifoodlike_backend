const StoreModel = require('./store.model');
const service = {};

service.create = async (data) => {    
    store = new StoreModel(data)
    return await store.save()
}

service.update = async (data) => {
    var store = await StoreModel.findOne({'name': data.name})
    store.overwrite(data)
    return await store.save()
} 

service.getByName = async (name) => {
    return await StoreModel.findOne({'name': name}).select({'_id': 0, '__v': 0, 'taxes._id': 0})
}

service.exists = async (name) => {
    return StoreModel.exists({'name': name});
}

module.exports = service