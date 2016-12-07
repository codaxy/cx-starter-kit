import { HtmlElement, Route } from 'cx/widgets';


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
