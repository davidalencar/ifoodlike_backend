const StoreModel = require('./store.model')
const service = {};

service.create = async (data) => {
    const store = new StoreModel(data)
    return await store.save()
}

service.getByName = async (name) => {
    return await StoreModel.findOne({'name': name})
}

module.exports = service