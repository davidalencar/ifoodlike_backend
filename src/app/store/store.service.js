const StoreModel = require('./store.model');
const service = {};
const dLabels = {
    name: 'novo cliente',
    color: '#78d372'
}
service.create = async (data) => {    
    var store = new StoreModel(data)
    return await store.save()
}


service.createFromTemplate = async (name, userId) => {    
    var store = new StoreModel(require('./template.json'))
    store.name = name;
    store.user = userId;
    return await store.save()
}

service.update = async (data) => {
    var store = await StoreModel.findOne({'name': data.name})
    store.overwrite(data)
    return await store.save()
} 

service.getByName = async (name) => {
    var store = await StoreModel.findOne({'name': name}).select({'_id': 0, '__v': 0, 'taxes._id': 0})
    if (store.labels == undefined) {
        store.labels = [dLabels]
    } else  {
        store.labels.push(dLabels);
    }
    return store;
}

service.getByUser = async (useId) => {
    const stores = await StoreModel.find({'user': useId}).select({'name' : 1, '_id': 0})
    return stores.map(s => s.name)
}

service.exists = async (name) => {
    return StoreModel.exists({'name': name});
}


module.exports = service