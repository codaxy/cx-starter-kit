import {ContentPlaceholder} from 'cx/ui/layout/ContentPlaceholder';
import {HtmlElement} from 'cx/ui/HtmlElement';
import {TabNav} from 'app/components/TabNav';
import {Link} from 'cx/ui/nav/Link';
import {UserInfo} from 'app/components/UserInfo';

export const TopTabsLayout = <cx>
    <div class="csb-toptabslayout">
        <header class="cse-toptabslayout-header">
            <h1><Link href="~/">Cx Starter</Link></h1>
            <UserInfo />
            <TabNav />
        </header>
        <div class="cse-toptabslayout-content">
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
