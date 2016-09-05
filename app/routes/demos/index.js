import {HtmlElement} from 'cx/ui/HtmlElement';
import {Route} from 'cx/ui/nav/Route';
import Todo from './todo';
import GitHub from './github';

export default <cx>
    <Route route="~/demos/todo" url:bind="url">
        <Todo />
    </Route>

    <Route route="~/demos/github" url:bind="url">
        <GitHub />
    </Route>
</cx>;
