const CustomerModel = require('./customer.model');
const service = {};


service.getByStore = async (store) => {
    return CustomerModel.find({'stores.name': store}).sort({'name':'asc'})
}

service.setLabel = async (custId, store, label) => {
    var cust = await CustomerModel.findById(custId);
    cust.stores[cust.stores.findIndex(s => s.name == store)].label = label;
    return cust.save()
}

module.exports = service