const CustomerModel = require('./customer.model');
const service = {};


service.getByStore = async (store) => {
    return CustomerModel.find({'stores.name': store}).sort({'name':'asc'})
}


module.exports = service