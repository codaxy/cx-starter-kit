import {Resource} from 'app/util/Resource';
import casual from 'app/util/casual';
import {getComparer} from 'cx/data/comparer';
import {dateDiff} from 'cx/util/date/dateDiff';
import {round2} from 'app/util/round2';


var year = new Date().getFullYear();

var pageViews = Array.from({length: 20000}, (_, index) => ({
    userId: casual.integer(1, 2000),
    sessionId: casual.integer(1, 5000),
    pageId: casual.integer(1, 10000),
    country: casual.country,
    city: casual.city,
    browser: casual.browser,
    os: casual.os,
    date: new Date(year - casual.integer(0, 2), casual.integer(0, 11), casual.integer(1, 31)),
    duration: casual.integer(5, 5 * 60),
    bounce: Math.random() > 0.5,
    newVisitor: Math.random() > 0.6,
}));

export function getPageViews(fromDate, toDate) {
    var from = new Date(fromDate);
    var to = new Date(toDate);

    return pageViews.filter(x=>dateDiff(x.date, from) >= 0 && dateDiff(x.date, to) < 0);
}
