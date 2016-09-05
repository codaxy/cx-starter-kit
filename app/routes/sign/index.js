import {Route} from 'cx/ui/nav/Route';
import SignIn from './in';
import SignOut from './out';

export default <cx>
    <Route route="~/sign/in?returnUrl=:returnUrl" url:bind="url" items={SignIn} params:bind="$page.params"/>
    <Route route="~/sign/in" url:bind="url" items={SignIn}/>
    <Route route="~/sign/out" url:bind="url" items={SignOut}/>
</cx>;
