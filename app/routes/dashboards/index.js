import {HtmlElement} from 'cx/ui/HtmlElement';
import {Route} from 'cx/ui/nav/Route';
import Sales from './sales';

export default <cx>
    <Route route="~/dashboards/sales" url:bind="url">
        <Sales />
    </Route>
</cx>;
