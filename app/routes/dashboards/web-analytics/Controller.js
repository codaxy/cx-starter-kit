import { Controller, History, Url } from 'cx/ui';
import {getPageViews, groupBy, sortBy} from './api';


export default class extends Controller {
    init() {
        super.init();

        var today = new Date();

        this.store.init('$page.date', {
            from: new Date(today.getFullYear(), today.getMonth() - 12, 1),
            to: new Date(today.getFullYear(), today.getMonth(), 1)
        });

        this.store.init('$page.selected', {
            field: 'sessions'
        });

        this.store.init('$page.slots', {
            slot0: 'referral',
            slot1: 'country',
            slot2: 'browser',
            slot3: 'city',
        });

        var oldSlots;
        this.addTrigger('slot-change', ['$page.slots'], slots => {
            if (oldSlots) {
                var change;
                for (var key in slots)
                    if (slots[key] != oldSlots[key])
                        change = key;
                if (change) {
                    for (var key in slots)
                        if (change != key && slots[key] == slots[change]) {
                            slots = {
                                ...slots,
                                [key]: oldSlots[change]
                            };
                            this.store.set('$page.slots', slots);
                            this.store.delete(`$page.selected.${key}`);
                            this.store.delete(`$page.selected.${change}`);
                            break;
                        }
                }
            }
            oldSlots = slots;
        }, true);

        this.store.init('$page.fields', [{
            id: 'sessions',
            text: 'Sessions',
            format: 'n;0',
            aggregates: {
                sessions: {
                    type: 'distinct',
                    value: {bind: 'sessionId'}
                }
            },
        }, {
            id: 'users',
            text: 'Users',
            format: 'n;0',
            aggregates: {
                users: {
                    type: 'distinct',
                    value: {bind: 'userId'}
                }
            }
        }, {
            id: 'pageViews',
            text: 'Page Views',
            format: 'n;0',
            aggregates: {
                pageViews: {
                    type: 'count',
                    value: 1
                }
            }
        }, {
            id: 'pages',
            text: 'Pages',
            format: 'n;2',
            aggregates: {
                sessions: {
                    type: 'distinct',
                    value: {bind: 'sessionId'}
                },
                pageViews: {
                    type: 'count',
                    value: 1
                }
            },
            value: x => x.aggregates.pageViews / x.aggregates.sessions
        }, {
            id: 'bounceRate',
            text: 'Bounce Rate',
            format: 'p;1',
            aggregates: {
                bounces: {
                    type: 'sum',
                    value: {bind: 'bounces'}
                },
                pageViews: {
                    type: 'count',
                    value: 1
                }
            },
            value: x => x.aggregates.bounces / x.aggregates.pageViews
        }, {
            id: 'duration',
            text: 'Avg. Session Duration',
            format: 'duration',
            aggregates: {
                duration: {
                    type: 'avg',
                    value: {bind: 'duration'}
                }
            }
        }]);

        this.addComputable('$page.field', ['$page.fields', '$page.selected.field'], (fields, id) => fields.find(a=>a.id == id));

        this.addComputable('$page.data', ['$page.date'], (date) => {
            return getPageViews(date.from, date.to);
        }, true);

        this.addComputable('$page.total', ['$page.data', '$page.fields'], (data, fields) => {
            var aggregates = {};
            fields.forEach(f=> Object.assign(aggregates, f.aggregates));
            var result = groupBy(data, {}, aggregates, x => {
                var r = {
                    ...x.aggregates
                };
                fields.forEach(f=> {
                    if (f.value)
                        r[f.id] = f.value(x)
                });
                return r;
            });
            return result[0];
        });

        this.addComputable('$page.monthly', ['$page.data', '$page.fields', '$page.selected.field'], (data, fields, field) => {
            var aggregates = {};
            fields.forEach(f=> Object.assign(aggregates, f.aggregates));
            var result = groupBy(data, {
                year: x => x.date.getFullYear(),
                month: x => x.date.getMonth(),
            }, aggregates, x => {
                var r = {
                    date: new Date(x.key.year, x.key.month, 1),
                    month: Number(x.key.year) * 12 + Number(x.key.month),
                    ...x.aggregates
                };
                fields.forEach(f=> {
                    if (f.value)
                        r[f.id] = f.value(x)
                });
                r.value = r[field];
                return r;
            });
            return result;
        });

        this.addComputable('$page.details', ['$page.data', '$page.field', '$page.slots', '$page.selected'], (data, field, slots, selected) => {
            var details = {};
            var categories = [slots.slot0, slots.slot1, slots.slot2, slots.slot3];

            categories.forEach((cat, index)=> {
                var slotName = 'slot' + index;
                var result = sortBy(groupBy(data, {
                    name: {bind: cat}
                }, field.aggregates, x => {
                    var r = {
                        name: x.key.name,
                        ...x.aggregates
                    };
                    if (field.value)
                        r[field.id] = field.value(x);
                    r.value = r[field.id];
                    return r;
                })).slice(0, 12);

                //max value required for bars
                result.forEach(d=>d.max = result[0].value);
                details[slotName] = result;

                if (Array.isArray(selected[slotName]) && selected[slotName].length > 0) {
                    data = data.filter(x=>selected[slotName].indexOf(x[cat]) != -1);

                    //check if all selected values are actualy in the data
                    var validSelections = selected[slotName].filter(x=>details[slotName].some(y=>y.name == x));
                    if (validSelections.length != selected[slotName].length)
                        this.store.set('$page.selected.' + slotName, validSelections);
                }

            });
            return details;
        });
    }
}
