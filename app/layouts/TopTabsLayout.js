import { ContentPlaceholder } from 'cx/ui';
import { HtmlElement, Link } from 'cx/widgets';


import {TabNav} from 'app/components/TabNav';

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
