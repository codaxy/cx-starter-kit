import {Resource} from 'app/util/Resource';
import casual from 'app/util/casual';
import {getComparer} from 'cx/data/comparer';
import {diff} from 'cx/util/date/diff';
import {round2} from 'app/util/round2';

var productData = Array.from({length: 200}, (_, index) => ({
    id: index + 1,
    name: `${casual.last_name} ${casual.integer(1, 10)}`,
    unitPrice: parseFloat(casual.double(10, 1000).toFixed(2)),
    taxPct: casual.integer(10, 20),
}));

var orderItemData = [];
var orderNo = 10000;

const orderData = Array.from({length: 500}, (_, index) => {
    var firstName = casual.first_name,
        lastName = casual.last_name,
        startYear = new Date().getFullYear() - 9;

    var itemCount = casual.integer(1, 10);
    var discountPct = casual.integer(0, 20);
    var orderId = index + 1;

    var items = Array.from({length: itemCount}, (_, index) => {
        var product = casual.random_element(productData);
        var qty = casual.integer(1, 100);

        var regularAmount = round2(qty * product.unitPrice);
        var discountAmount = round2(regularAmount * discountPct / 100);
        var taxAmount = round2((regularAmount - discountAmount) * product.taxPct / 100);

        return {
            id: orderItemData.length + index + 1,
            orderId: orderId,
            productId: product.id,
            productName: product.name,
            unitPrice: product.unitPrice,
            qty: qty,
            taxPct: product.taxPct,
            discountPct: discountPct,
            totalAmount: regularAmount - discountAmount + taxAmount,
            regularAmount,
            discountAmount,
            taxAmount
        }
    });

    var order = {
        totalAmount: 0,
        taxAmount: 0,
        discountAmount: 0,
        regularAmount: 0
    };

    items.forEach(item=> {
        order.totalAmount += item.totalAmount;
        order.regularAmount += item.regularAmount;
        order.discountAmount += item.discountAmount;
        order.taxAmount += item.taxAmount;
    });

    orderItemData.push(...items);

    return {
        id: orderId,
        date: new Date(startYear + Math.floor(index / 50), index % 12, index % 30),
        orderNo: orderNo++,
        customer: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
        street: casual.street,
        streetNo: casual.integer(1, 100),
        zip: casual.integer(10000, 100000),
        city: casual.city,
        state: casual.state,
        country: casual.country,
        currency: 'USD',
        ...order
    }
});

export const orders = new Resource(orderData);

//these methods should be done on the server

orders.newRecord = data => ({
  orderNo: orderNo++
});

orders.filter = (data, f) => {
    var filter = {
        page: 1,
        pageSize: 20,
        ...f
    };
    var result = [...data];
    var checks;

    if (filter.orderNo != null)
        result = result.filter(a=>a.orderNo == filter.orderNo);

    if (filter.customer != null) {
        checks = f.customer.split(' ').map(w=>new RegExp(w, 'gi'));
        result = result.filter(a=>checks.every(ex=>a.customer.match(ex)));
    }

    if (filter.country != null) {
        checks = f.country.split(' ').map(w=>new RegExp(w, 'gi'));
        result = result.filter(a=>checks.every(ex=>a.country.match(ex)));
    }

    if (filter.city != null) {
        checks = f.city.split(' ').map(w=>new RegExp(w, 'gi'));
        result = result.filter(a=>checks.every(ex=>a.city.match(ex)));
    }

    if (filter.dateFrom != null) {
        let from = new Date(filter.dateFrom);
        result = result.filter(a=>diff(new Date(a.date), from) >= 0);
    }

    if (filter.dateTo != null) {
        let to = new Date(filter.dateTo);
        result = result.filter(a=>diff(new Date(a.date), to) < 0);
    }

    if (filter.sorters) {
        var compare = getComparer(filter.sorters.map(x=>({value: {bind: x.field}, direction: x.direction})));
        result.sort(compare); //simulate database sort
    }

    //return one element more than asked for paging purposes
    return result.slice((filter.page - 1) * filter.pageSize, filter.page * filter.pageSize + 1);
};

export const products = new Resource(productData);

products.filter = (data, f) => {
    var filter = {
        page: 1,
        pageSize: 20,
        ...f
    };
    var result = [...data];
    var checks;
    if (filter.query) {
        checks = f.query.split(' ').map(w=>new RegExp(w, 'gi'));
        result = result.filter(a=>checks.every(ex=>a.name.match(ex)));
    }
    //return one element more than asked for paging purposes
    return result.slice((filter.page - 1) * filter.pageSize, filter.page * filter.pageSize + 1);
};

export const orderItems = new Resource(orderItemData);

orderItems.filter = (data, f) => {
    var filter = {
        ...f
    };

    var result = data.filter(a=>a.orderId == filter.orderId);

    return result;
};