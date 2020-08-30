const SalesModel = require('./sales.model')
const CustomerModel = require('../customer/customer.model')
const service = {};


service.create = async (data) => {
    var customer = await CustomerModel.findOne({ 'phone': data.customer.phone });

    if (!customer){
        customer = await new CustomerModel(data.customer).save()
    } else {
        customer.stores.push({name: data.order.store})
        await customer.save();
    }

    data.order.cust = customer._id

    const sale = await new SalesModel(data.order).save()


    return sale.salesId
}


service.getByStore = async (store) => {
    const sales = await SalesModel.find({ 'store': store }).sort({'salesId': 'asc'}).populate('cust').populate('lines.productId')

    return sales;
}

service.updateStatus = async (salesId, status) => {
    var sale = await SalesModel.findOne({ 'salesId': salesId });
    sale.status = status;
    
    return sale.save()
}

service.delete = async (salesId) => {
    return SalesModel.findOneAndRemove({ 'salesId': salesId });
}

module.exports = service