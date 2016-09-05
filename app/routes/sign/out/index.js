import {HtmlElement} from 'cx/ui/HtmlElement';

import Controller from './Controller';
import {MessageLayout} from 'app/layouts/MessageLayout';

export default <cx>
    <div outerLayout={MessageLayout} controller={Controller}>
        <h3>Sign Out</h3>
        <p>Signing out. You'll be redirected promptly.</p>
    </div>
</cx>

