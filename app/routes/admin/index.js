import { HtmlElement, Route } from 'cx/widgets';


import Contacts from './contacts';
import OrderRoutes from './orders';

export default <cx>
    <Route route="~/admin/contacts" url:bind="url" items={Contacts} />
    <OrderRoutes />
</cx>;
