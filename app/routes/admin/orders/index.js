import {HtmlElement} from 'cx/ui/HtmlElement';
import {Route} from 'cx/ui/nav/Route';
import Single from './single';
import List from './list';

export default <cx>
    <Route route="~/admin/orders" url:bind="url" items={List} />
    <Route route="~/admin/orders/:id" url:bind="url" items={Single} />
</cx>;
