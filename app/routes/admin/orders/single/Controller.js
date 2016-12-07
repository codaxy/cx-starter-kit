import { Controller, History, Url } from 'cx/ui';
import { updateArray, append, diffArrays } from 'cx/data';
import { MsgBox } from 'cx/widgets';



import {orders, orderItems, products} from '../api';
import {round2} from 'app/util/round2';


import deepEquals from 'deep-equal';



export default class extends Controller {
    init() {
        super.init();
        this.store.init('$page.add', this.store.get('$route.id') == 'new');
        this.store.init('$page.order', {});
        this.store.init('$page.orderItems', []);

        this.reload();

        this.store.set('layout.menu.hide',true);

        this.addTrigger('line-calc', ['$page.orderItems'], () => {
            this.store.update('$page.orderItems', updateArray, (item) => {
                var regularAmount = round2((item.qty || 0) * (item.unitPrice || 0));
                var discountAmount = round2(regularAmount * (item.discountPct || 0) / 100);
                var taxAmount = round2((regularAmount - discountAmount) * (item.taxPct || 0) / 100);
                var totalAmount = regularAmount - discountAmount + taxAmount;

                //if total didn't change return the original object
                if (item.totalAmount == totalAmount)
                    return item;

                //on change, return a new object so change can be detected
                return {
                    ...item,
                    regularAmount,
                    discountAmount,
                    taxAmount,
                    totalAmount
                };
            });
        });

        this.addTrigger('total-calc', ['$page.orderItems'], (items) => {
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

            this.store.set('$page.order.totalAmount', order.totalAmount);
            this.store.set('$page.order.regularAmount', order.regularAmount);
            this.store.set('$page.order.discountAmount', order.discountAmount);
            this.store.set('$page.order.taxAmount', order.taxAmount);
        });
    }

    reload() {
        var id = this.store.get('$route.id');
        if (id != 'new') {
            var promise = orders.get(id)
                                .then(data => {
                                    this.store.set('$page.order', data);
                                });
            this.setLoadingIndicator(promise);

            promise = orderItems.query({orderId: id})
                                .then(data => {
                                    this.store.set('$page.orderItems', data);
                                });
            this.setLoadingIndicator(promise);
        } else {
            this.store.set('$page.order', {});
            this.store.set('$page.orderItems', []);
        }
    }

    setSavingIndicator(p) {
        this.store.update('$page.saving', saving => (saving || 0) + 1);
        return p.then(x=> {
            this.store.update('$page.saving', saving => saving - 1);
            return x;
        }).catch(e=> {
            this.store.update('$page.saving', saving => saving - 1);
            throw e;
        })
    }

    setLoadingIndicator(p) {
        this.store.update('$page.loading', loading => (loading || 0) + 1);
        p.then(x=> {
            this.store.update('$page.loading', loading => loading - 1);
            return x;
        }).catch(e=> {
            this.store.update('$page.loading', loading => loading - 1);
        })
    }

    onQueryProducts(q) {
        return products.query({query: q});
    }

    onAddItem() {
        this.nextItemId = this.nextItemId || -1;
        this.store.update('$page.orderItems', append, {
            id: this.nextItemId--
        })
    }

    onRemoveItem(e, {store}) {
        var id = store.get('$record.id');
        this.store.update('$page.orderItems', items => items.filter(a=>a.id != id));
    }

    onSave() {
        // save is complex
        // first save the order
        // detect changes on items by comparing to the values from the server
        // execute item changes

        var {order, add} = this.store.get('$page');
        var items = this.store.get('$page.orderItems');

        var promise;
        if (add)
            promise = orders.put(order);
        else
            promise = orders.post(order.id, order);


        promise = promise.then(o => {
            this.store.set('$page.order', o);

            return orderItems
                .query({orderId: o.id})
                .then(oldItems=> {
                    //compare items in the store with items on the server using the id field
                    var diff = diffArrays(oldItems, items, x=>x.id);

                    var promises = [];

                    diff.added.forEach(item=> {
                        item.orderId = o.id;
                        var p = orderItems.put(item).then(newItem => {
                            this.store.update('$page.orderItems', updateArray, x => newItem, x => x == item);
                            return newItem;
                        });
                        promises.push(this.setSavingIndicator(p));
                    });

                    diff.changed.forEach(item=> {
                        if (!deepEquals(item.before, item.after)) {
                            var p = orderItems.post(item.after.id, item.after).then(newItem => {
                                this.store.update('$page.orderItems', updateArray, x => newItem, x => x.id == item.after.id);
                                return newItem;
                            });
                            promises.push(this.setSavingIndicator(p));
                        }
                    });

                    diff.removed.forEach(item=> {
                        var p = orderItems.delete(item.id, item).then(() => {
                            this.store.update('$page.orderItems', x => x.filter(a => a.id != item.id));
                        });
                        promises.push(this.setSavingIndicator(p));
                    });

                    return Promise.all(promises);
                });
        });

        this.setSavingIndicator(promise)
            .then(()=> {
                if (add) {
                    var url = `~/admin/orders/${this.store.get('$page.order.id')}`;

                    //transfer core data to the new page to avoid flickering
                    this.store.update('pages', pages => ({
                        ...pages,
                        [url]: {
                            ...pages[url],
                            order: this.store.get('$page.order'),
                            orderItems: this.store.get('$page.orderItems')
                        }
                    }));

                    //by using replaceState, back button will go back to Orders
                    History.replaceState({}, null, url);
                }
            })
            .catch(e=> {
                console.log(e);
                MsgBox.alert({
                    title: 'Error',
                    message: e.toString()
                })
            });
    }
}
