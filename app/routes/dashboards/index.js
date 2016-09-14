import {HtmlElement} from 'cx/ui/HtmlElement';
import {Route} from 'cx/ui/nav/Route';
import Sales from './sales';
import WebAnalytics from './web-analytics';

export default <cx>
    <Route route="~/dashboards/sales" url:bind="url">
        <Sales />
    </Route>
    <Route route="~/dashboards/web-analytics" url:bind="url">
        <WebAnalytics />
    </Route>
</cx>;
