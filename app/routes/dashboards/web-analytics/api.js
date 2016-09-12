import {Resource} from 'app/util/Resource';
import casual from 'app/util/casual';
import {getComparer} from 'cx/data/comparer';
import {dateDiff} from 'cx/util/date/dateDiff';
import {round2} from 'app/util/round2';

var pageViews

export function getPageViews(fromDate, toDate) {
    var from = new Date(fromDate);
    var to = new Date(toDate);

    var year = new Date().getFullYear();

    if (!pageViews) {

        var countries = Array.from({length: 50}, ()=>casual.country);
        var cities = Array.from({length: 100}, ()=>casual.city);

        pageViews = Array.from({length: 20000}, (_, index) => ({
            userId: casual.integer(1, 2000),
            sessionId: casual.integer(1, 5000),
            pageId: casual.integer(1, 10000),
            country: casual.random_element(countries),
            city: casual.random_element(cities),
            browser: casual.browser,
            os: casual.os,
            date: new Date(year, casual.integer(-23, 11), casual.integer(1, 31)),
            duration: casual.integer(5, 5 * 60),
            bounce: Math.random() > 0.5,
            newVisitor: Math.random() > 0.6,
        }));
    }

    return pageViews.filter(x=>dateDiff(x.date, from) >= 0 && dateDiff(x.date, to) < 0);
}
