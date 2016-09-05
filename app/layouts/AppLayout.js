import {ContentPlaceholder} from 'cx/ui/layout/ContentPlaceholder';
import {HtmlElement} from 'cx/ui/HtmlElement';
import {SideNav} from 'app/components/SideNav';
import {Link} from 'cx/ui/nav/Link';
import {Glyph} from 'app/components/Glyph';
import {UserInfo} from 'app/components/UserInfo';
import {GlobalCacheIdentifier} from 'cx/util/GlobalCacheIdentifier';

function toggleMenu(e, {store}) {
    store.toggle('layout.menu.hide');
}

function forceRedraw(e, {store}) {
    GlobalCacheIdentifier.change();
    store.notify();
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
        <div class="cse-applayout-content" onTransitionEnd={forceRedraw}>
            <aside class="cse-applayout-nav">
                <SideNav />
            </aside>
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
