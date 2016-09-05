import {Route} from 'cx/ui/nav/Route';
import {RedirectRoute} from 'cx/ui/nav/RedirectRoute';
import {PureContainer} from 'cx/ui/PureContainer';
import {FirstVisibleChildLayout} from 'cx/ui/layout/FirstVisibleChildLayout';
import {Sandbox} from 'cx/ui/Sandbox';
import {HtmlElement} from 'cx/ui/HtmlElement';

import {applyOuterLayout} from 'app/layouts/dynamicLayout';
import {MessageLayout} from 'app/layouts/MessageLayout';
import {PageNotFound} from './PageNotFound';

import SignRoutes from './sign';
import DemoRoutes from './demos';
import LayoutRoutes from './layouts';
import DashboardRoutes from './dashboards';
import AdminRoutes from './admin';

import Default from './default';

export default <cx>
    <Sandbox key:bind="url"
             storage:bind="pages"
             recordName="$page"
             layout={FirstVisibleChildLayout}>

        {/*always active routes*/}
        <SignRoutes />

        <Route route="~/" url:bind="url" items={Default}/>

        {/*<RedirectRoute url:bind="url" route="*any" redirect="~/sign-in" visible:expr="!{user}"/>*/}

        <PureContainer visible:expr="!!{user}" layout={FirstVisibleChildLayout} onExplore={applyOuterLayout}>
            {/*signed in routes*/}
            <DemoRoutes />
            <AdminRoutes />
            <LayoutRoutes/>
            <DashboardRoutes />
            <PageNotFound />
        </PureContainer>

        <RedirectRoute route="~/(*splat)" url:bind="url" redirect:tpl="~/sign/in?returnUrl={url:urlencode}"/>

        <PageNotFound outerLayout={MessageLayout}/>
    </Sandbox>
</cx>;
