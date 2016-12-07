import { ContentPlaceholder } from 'cx/ui';
import { HtmlElement, Link } from 'cx/widgets';
import { GlobalCacheIdentifier } from 'cx/util';


import {SideNav} from 'app/components/SideNav';

import {Glyph} from 'app/components/Glyph';
import {UserInfo} from 'app/components/UserInfo';


function toggleMenu(e, {store}) {
    store.toggle('layout.menu.hide');
    GlobalCacheIdentifier.change(); //redraw contents
}

export const AppLayout = <cx>
    <div class={{"csb-applayout": true, 'css-hide-menu': { bind: 'layout.menu.hide' }}}>
        <header class="cse-applayout-header">
            <Link  class="cse-applayout-logo" href="~/"><span><span>Cx</span> Starter</span></Link>
            <div class="cse-applayout-headercontent">
                <div class="cse-applayout-menu" onClick={toggleMenu}><i class="csb-cssicon-menu"></i></div>
                <div class="cse-applayout-customheader">
                    <ContentPlaceholder name="header" />
                </div>
                <div class="cse-applayout-user">
                    <UserInfo />
                </div>
            </div>
        </header>
        <div class="cse-applayout-content">
            <aside class="cse-applayout-nav">
                <SideNav />
            </aside>
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
