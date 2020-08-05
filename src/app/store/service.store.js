const Store = require('./model.store')
const service = {};

service.create = async (store) => {
    const storeModel = new Store(store)

    return await storeModel.save()
}

module.exports = service