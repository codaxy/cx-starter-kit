import {Controller} from 'cx/ui/Controller';
import {History} from 'cx/app/History';
import {Url} from 'cx/app/Url';
import {getPageViews} from './api';
import {Grouper} from 'cx/data/Grouper';
import {sorter} from 'cx/data/comparer';

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

        this.store.init('$page.fields', [{
            id: 'sessions',
            text: 'Sessions',
            format: 'n;0',
            aggregateField: 'sessionId',
            aggregate: 'distinct'
        }, {
            id: 'users',
            text: 'Users',
            format: 'n;0',
            aggregateField: 'userId',
            aggregate: 'distinct'
        }, {
            id: 'pageViews',
            text: 'Page Views',
            format: 'n;0',
            aggregate: 'count'
        }, {
            id: 'pages',
            text: 'pages',
            format: 'n;2',
            aggregate: 'avg'
        }, {
            id: 'bounceRate',
            text: 'Bounce Rate',
            format: 'p',
            aggregate: 'avg'
        }]);

        this.addComputable('$page.field', ['$page.fields', '$page.selected.field'], (fields, id) => fields.find(a=>a.id == id));

        this.addComputable('$page.data', ['$page.date'], (date) => {
            return getPageViews(date.from, date.to);
        }, true);

        this.addTrigger('$page.monthly', ['$page.data', '$page.selected.field'], (data, field) => {

            var months = {};

            var total = {
                sessions: 0,
                pageViews: 0,
                bounces: 0,
                users: 0,
                newVisitors: 0,
                userIds: {}
            };

            for (var i = 0; i < data.length; i++) {
                var x = data[i];
                var monthKey = x.date.getFullYear() * 100 + x.date.getMonth();
                var m = months[monthKey];
                if (!m) {
                    m = months[monthKey] = {
                        date: new Date(x.date.getFullYear(), x.date.getMonth(), 1),
                        month: monthKey,
                        sessions: 0,
                        users: 0,
                        pageViews: 0,
                        sessionIds: {},
                        userIds: {},
                        pages: {},
                        bounces: 0,
                        newVisitors: 0
                    }
                }

                m.pageViews++;

                if (!m.sessionIds[x.sessionId]) {
                    m.sessions++;
                    m.sessionIds[x.sessionId] = true;
                }

                if (!m.userIds[x.userId]) {
                    m.users++;
                    m.userIds[x.userId] = true;
                }

                if (!total.userIds[x.userId]) {
                    total.users++;
                    total.userIds[x.userId] = true;
                }

                if (x.bounce)
                    m.bounces++;

                if (x.newVisitor)
                    m.newVisitors++;
            }

            var keys = Object.keys(months);
            keys.sort();


            this.store.set('$page.monthly', keys.map(k=> {
                var {month, date, sessions, users, pageViews, bounces, newVisitors} = months[k];

                total.sessions += sessions;
                total.pageViews += pageViews;
                total.bounces += bounces;
                total.newVisitors += newVisitors;

                var res = {
                    month, sessions, users, pageViews, bounces, newVisitors, date,
                    pageRate: pageViews / sessions,
                    bounceRate: bounces / pageViews,
                    newVisitorsRate: newVisitors / sessions
                };
                res.value = res[field];
                return res;
            }));

            total.pageRate = total.pageViews / total.sessions;
            total.bounceRate = total.bounces / total.pageViews;
            total.newVisitorsRate = total.newVisitors / total.sessions;

            this.store.set('$page.total', total);
        });

        this.store.init('$page.breakBy', 'country');

        this.store.init('$page.breakOptions', [{
            id: 'country',
            text: 'Country'
        }, {
            id: 'city',
            text: 'City'
        }, {
            id: 'browser',
            text: 'Browser'
        }]);

        this.addComputable('$page.break', ['$page.breakOptions', '$page.breakBy'], (options, id) => options.find(a=>a.id == id));

        this.addComputable('$page.details', ['$page.breakBy', '$page.data', '$page.field'], (breakField, data, field) => {
            var grouper = new Grouper({name: {bind: breakField}}, {
                value: {
                    type: field.aggregate,
                    value: {bind: field.aggregateField || field.id}
                }
            });
            grouper.processAll(data);
            var results = grouper.getResults().map(x=>({
                name: x.key.name,
                value: x.aggregates.value
            }));
            var sort = sorter([{value: {bind: 'value'}, direction: 'DESC'}]);
            return sort(results).slice(0, 15);
        });
    }
}
