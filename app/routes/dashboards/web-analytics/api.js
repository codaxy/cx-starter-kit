import { getComparer, Grouper, sorter } from 'cx/data';
import { dateDiff } from 'cx/util';
import {Resource} from 'app/util/Resource';
import casual from 'app/util/casual';


import {round2} from 'app/util/round2';



var pageViews;

export function getPageViews(fromDate, toDate) {
    var from = new Date(fromDate);
    var to = new Date(toDate);

    var year = new Date().getFullYear();
    var month = new Date().getMonth();

    if (!pageViews) {

        var countries = Array.from({length: 50}, ()=>casual.country);
        var cities = Array.from({length: 100}, ()=>casual.city);
        var referals = Array.from({length: 50}, ()=>`www.${casual.word}.com`);

        pageViews = Array.from({length: 10000}, (_, index) => ({
            userId: casual.integer(1, 2000),
            sessionId: casual.integer(1, 5000),
            pageId: casual.integer(1, 10000),
            country: casual.random_element(countries),
            city: casual.random_element(cities),
            browser: casual.operating_system + '/' + casual.browser,
            referral: casual.random_element(referals),
            date: new Date(year, month - Math.round(Math.pow(Math.random(), 2) * 24), casual.integer(1, 31)),
            duration: casual.integer(5, 5 * 60),
            bounces: Math.random() > 0.5 ? 1 : 0,
            newVisitors: Math.random() > 0.6 ? 1 : 0,
        }));
    }

    return pageViews.filter(x=>dateDiff(x.date, from) >= 0 && dateDiff(x.date, to) < 0);
}

export function groupBy(data, key, aggregates, value) {
    var g = new Grouper(key, aggregates);
    g.processAll(data);
    return g.getResults().map(value);
}

export function sortBy(data, field = 'value', dir = 'DESC') {
    var sort = sorter([{value: {bind: field}, direction: dir}]);
    return sort(data);
}