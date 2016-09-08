import {ContentPlaceholder} from 'cx/ui/layout/ContentPlaceholder';
import {HtmlElement} from 'cx/ui/HtmlElement';
import {TabNav} from 'app/components/TabNav';
import {Link} from 'cx/ui/nav/Link';
import {UserInfo} from 'app/components/UserInfo';

export const TopTabsLayout = <cx>
    <div class="csb-toptabslayout">
        <header class="cse-toptabslayout-header">
            <div class="flex-row">
                <Link class="cse-toptabslayout-logo" href="~/"><span><span>Cx</span> Starter</span></Link>
                <div class="flex1" />
                <UserInfo />
            </div>
            <TabNav />
        </header>
        <div class="cse-toptabslayout-content">
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
