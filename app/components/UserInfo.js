import { HtmlElement, Menu, Link, Text, Submenu } from 'cx/widgets';

import {Glyph} from 'app/components/Glyph';




import {openSettingsWindow} from './SettingsWindow';

export const UserInfo = <cx>
    <Menu horizontal>
        <Submenu>
            <div preserveWhitespace class="csb-user">
                <Glyph name="user" /> <Text bind="user.displayName" />
            </div>

            <Menu putInto="dropdown">
                <a class="cxm-menu-pad" href="#" onClick={(e, {store}) => { openSettingsWindow(store); e.preventDefault(); }}>Settings</a>
                <hr />
                <Link mod="menu-pad" href="~/sign/out">Sign Out</Link>
            </Menu>
        </Submenu>
    </Menu>
</cx>
