import {ContentPlaceholder} from 'cx/ui/layout/ContentPlaceholder';
import {HtmlElement} from 'cx/ui/HtmlElement';
import {MenuNav} from 'app/components/MenuNav';
import {Link} from 'cx/ui/nav/Link';
import {UserInfo} from 'app/components/UserInfo';

export const TopMenuLayout = <cx>
    <div class="csb-topmenulayout">
        <header class="cse-topmenulayout-header">
            <h1><Link href="~/">Cx Starter</Link></h1>
            <UserInfo />
            <MenuNav />
        </header>
        <div class="cse-topmenulayout-content">
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
