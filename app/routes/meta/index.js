import { Route } from 'cx/widgets';

import OpenSourceSoftware from './open-source-software';

export default <cx>
    <Route route="~/meta/open-source-software" url:bind="url" items={OpenSourceSoftware}/>
</cx>;
