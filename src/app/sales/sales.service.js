const SalesModel = require('./sales.model')
const CustomerModel = require('../customer/customer.model')
const service = {};


service.create = async (data) => {


    var customer = await CustomerModel.findOne({ 'phone': data.customer.phone });

    if (!customer) customer = await new CustomerModel(data.customer).save()

    data.order.cust = customer._id

    const sale = await new SalesModel(data.order).save()


    return sale.salesId
}


service.getByStore = async (store) => {
    const sales = await SalesModel.find({ 'store': store }).populate('cust')

    return sales;
}

module.exports = service