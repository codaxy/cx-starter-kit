import {HtmlElement} from 'cx/ui/HtmlElement';
import {Route} from 'cx/ui/nav/Route';
import Contacts from './contacts';
import OrderRoutes from './orders';

export default <cx>
    <Route route="~/admin/contacts" url:bind="url" items={Contacts} />
    <OrderRoutes />
</cx>;
