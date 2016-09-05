
import {Widget} from 'cx/ui/Widget';
import {AppLayout} from './AppLayout';
import {TopMenuLayout} from './TopMenuLayout';
import {TopTabsLayout} from './TopTabsLayout';
import {store} from 'app/store';

var appLayout = Widget.create(AppLayout);
var topMenuLayout = Widget.create(TopMenuLayout);
var topTabsLayout = Widget.create(TopTabsLayout);

store.init('layout', "layout1");

export function applyOuterLayout(context, instance) {
    var {widget, store} = instance;
    var selectedLayout = store.get('layout');

    switch (selectedLayout) {
        default:
        case 'layout1':
            widget.outerLayout = appLayout;
            break;

        case 'layout2':
            widget.outerLayout = topMenuLayout;
            break;

        case 'layout3':
            widget.outerLayout = topTabsLayout;
            break;
    }
}

export function selectLayout(x) {
    store.set('layout', x);
}
