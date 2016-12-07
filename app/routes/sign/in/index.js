import { HtmlElement, Button } from 'cx/widgets';

import {MessageLayout} from 'app/layouts/MessageLayout';
import Controller from './Controller';


export default <cx>
    <div outerLayout={MessageLayout} controller={Controller}>
        <h3>Sign In</h3>
        <p>This is a demo application so just click this button and you'll be signed in.</p>
        <Button onClick="signIn" text="Sign In" />
    </div>
</cx>

