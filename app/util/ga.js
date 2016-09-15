import {Url} from 'cx/app/Url';
import {Controller} from 'cx/ui/Controller';

//NOTE: This file will be replaced by the build server

export function setupGoogleAnalytics() {
    //paste GA tracking code here
}

export function trackPageView(url) {
    // if (window.ga) {
    //     setTimeout(()=> {
    //         ga('set', 'page', Url.resolve(url));
    //         ga('send', 'pageview');
    //     }, 300);
    // }
}

export class GAController extends Controller {
    init() {
        super.init();

        this.addTrigger('GA', ['url'], url => {
            trackPageView(url)
        });
    }
}
