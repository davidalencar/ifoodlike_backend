const Store = require('./store.model')
const service = {};

service.create = async (store) => {
    const storeModel = new Store(store)

    return await storeModel.save()
}

module.exports = service