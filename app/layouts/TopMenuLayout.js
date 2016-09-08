import {ContentPlaceholder} from 'cx/ui/layout/ContentPlaceholder';
import {HtmlElement} from 'cx/ui/HtmlElement';
import {MenuNav} from 'app/components/MenuNav';
import {Link} from 'cx/ui/nav/Link';
import {UserInfo} from 'app/components/UserInfo';

export const TopMenuLayout = <cx>
    <div class="csb-topmenulayout">
        <header class="cse-topmenulayout-header">
            <div class="flex-row">
                <Link class="cse-topmenulayout-logo" href="~/"><span><span>Cx</span> Starter</span></Link>
                <div class="flex1" />
                <UserInfo />
            </div>
            <MenuNav />
        </header>
        <div>
            <ContentPlaceholder name="header" />
        </div>
        <div class="cse-topmenulayout-content">
            <ContentPlaceholder />
        </div>
    </div>
</cx>;
