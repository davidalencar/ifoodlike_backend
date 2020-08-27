const StoreModel = require('./store.model');
const service = {};

service.create = async (data) => {    
    var store = new StoreModel(data)
    return await store.save()
}


service.createFromTemplate = async (name) => {    
    var store = new StoreModel(require('./template.json'))
    store.name = name;
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

service.getByUser = async (useId) => {
    const stores = await StoreModel.find({'user': useId}).select({'name' : 1, '_id': 0})
    return stores.map(s => s.name)
}

service.exists = async (name) => {
    return StoreModel.exists({'name': name});
}


module.exports = service