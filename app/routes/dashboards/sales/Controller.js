import {Controller} from 'cx/ui/Controller';
import {History} from 'cx/app/History';
import {Url} from 'cx/app/Url';

function sparkline() {
    var v = 50;
    return Array.from({length: 21})
                .map((_, i) => ({
                    x: i,
                    y: v = (v + Math.random() * 10 - 5)
                }));
}

export default class extends Controller {
    init() {
        super.init();

        this.store.set('$page.keyMetrics', [{
            title: 'Revenue',
            target: 700000,
            actual: 913394,
            format: 'n:prefix;$', //TODO: currency,
            trend: sparkline()
        }, {
            title: 'Profit',
            target: 300000,
            actual: 193865,
            format: 'n:prefix;$', //TODO: currency
            trend: sparkline(),
            marked: true
        }, {
            title: 'Avg Order Size',
            target: 12000,
            actual: 5766,
            format: 'n:prefix;$', //TODO: currency
            trend: sparkline()
        }, {
            title: 'On Time Delivery',
            target: 90,
            actual: 94,
            format: 'ps',
            trend: sparkline()
        }, {
            title: 'New Customers',
            target: 1400,
            actual: 1247,
            format: 'n',
            trend: sparkline()
        }, {
            title: 'Cust Satisfaction',
            target: 4,
            actual: 4.73,
            format: 'suffix; of 5',
            trend: sparkline()
        }, {
            title: 'Market Share',
            target: 20,
            actual: 19,
            format: 'ps',
            trend: sparkline()
        }])

        this.store.set('$page.topCustomers', [{
            name: 'The Big Wine Store',
            revenue: 38,
            pipeline: 10,
        }, {
            name: "Wines 'R Us",
            revenue: 39,
            pipeline: 7,
        }, {
            name: 'Fruit of the Vine Inc',
            revenue: 32,
            pipeline: 10,
        }, {
            name: 'Spirits of the Age',
            revenue: 33,
            pipeline: 7,
        }, {
            name: 'The Beverage Company',
            revenue: 25,
            pipeline: 7,
        }, {
            name: 'Sips and Bites',
            revenue: 25,
            pipeline: 5,
        }, {
            name: "American Vintner's Best",
            revenue: 15,
            pipeline: 15,
        }, {
            name: "Barrel and Keg",
            revenue: 8,
            pipeline: 20,
        }]);

        this.store.set('$page.revenueQTD', [{
            region: 'North America',
            revenue: 47273,
            pipeline90: 10000,
            pipeline75: 15000,
            target: 45000
        }, {
            region: 'Europe',
            revenue: 44936,
            pipeline90: 8000,
            pipeline75: 12000,
            target: 43000
        }, {
            region: 'Asia',
            revenue: 39254,
            pipeline90: 5000,
            pipeline75: 10000,
            target: 53000
        }, {
            region: 'South America',
            revenue: 32734,
            pipeline90: 8000,
            pipeline75: 12000,
            target: 29000
        }, {
            region: 'Middle East',
            revenue: 20973,
            pipeline90: 10000,
            pipeline75: 15000,
            target: 38000
        }]);

        this.store.set('$page.revenueYTD', [{
            region: 'North America',
            revenue: 243585,
            target: 220000,
            trend: sparkline()
        }, {
            region: 'Europe',
            revenue: 201865,
            target: 190000,
            trend: sparkline()
        }, {
            region: 'Asia',
            revenue: 195766,
            target: 205000,
            trend: sparkline()
        }, {
            region: 'South America',
            revenue: 119394,
            target: 105000,
            trend: sparkline()
        }, {
            region: 'Middle East',
            revenue: 101624,
            target: 120000,
            trend: sparkline()
        }]);

        this.store.set('$page.productSalesYTD', [{
            product: 'Cabernet',
            revenue: 149003,
            target: 130000,
            units: 16000,
            unitsTarget: 15000,
            trend: sparkline()
        }, {
            product: 'Zinfandel',
            revenue: 23000,
            target: 21000,
            units: 16000,
            unitsTarget: 15000,
            trend: sparkline()
        }, {
            product: 'Chardonnay',
            revenue: 105934,
            target: 115000,
            units: 7000,
            unitsTarget: 10000,
            trend: sparkline()
        }, {
            product: 'Sauvignan Blanc',
            revenue: 60323,
            target: 55000,
            units: 16000,
            unitsTarget: 14000,
            trend: sparkline()
        }, {
            product: 'Merlot',
            revenue: 52624,
            target: 50000,
            units: 18000,
            unitsTarget: 24000,
            trend: sparkline()
        }]);

        this.store.set('$page.marketShare', [{
            company: 'Eno Beverages',
            share: 23,
            lastMonthShare: 24,
            highlight: false
        }, {
            company: 'Elysian Spirits',
            share: 17,
            lastMonthShare: 17.5,
            highlight: false
        }, {
            company: 'Our Company',
            share: 16,
            lastMonthShare: 16,
            highlight: true
        }, {
            company: "Vintner's Best",
            share: 14,
            lastMonthShare: 14,
            highlight: false
        }, {
            company: 'Golden Vines',
            share: 10,
            lastMonthShare: 10.5,
            highlight: false
        }, {
            company: 'Harvest Delight',
            share: 6,
            lastMonthShare: 4.5,
            highlight: false
        }, {
            company: 'All Others',
            share: 2.5,
            lastMonthShare: 2.5,
            highlight: false
        }]);
    }
}
