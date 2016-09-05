import {HtmlElement} from 'cx/ui/HtmlElement';
import {Glyph} from 'app/components/Glyph';
import {Menu} from 'cx/ui/nav/Menu';
import {Link} from 'cx/ui/nav/Link';
import {Text} from 'cx/ui/Text';
import {Submenu} from 'cx/ui/nav/Submenu';
import {openSettingsWindow} from './SettingsWindow';

export const UserInfo = <cx>
    <Menu horizontal>
        <Submenu>
            <div preserveWhitespace>
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
