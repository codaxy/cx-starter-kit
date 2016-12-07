import { Route } from 'cx/widgets';

import Layout1 from './layout1';
import Layout2 from './layout2';
import Layout3 from './layout3';

export default <cx>
    <Route route="~/layouts/layout1" url:bind="url" items={Layout1}/>
    <Route route="~/layouts/layout2" url:bind="url" items={Layout2}/>
    <Route route="~/layouts/layout3" url:bind="url" items={Layout3}/>
</cx>;
