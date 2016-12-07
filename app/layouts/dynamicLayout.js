import { Widget } from 'cx/ui';


import {AppLayout} from './AppLayout';
import {TopMenuLayout} from './TopMenuLayout';
import {TopTabsLayout} from './TopTabsLayout';
import {store} from 'app/store';

var cache = {};
store.init('layout.id', "layout1");

export function applyOuterLayout(context, instance) {
    var {widget, store} = instance;
    var layoutName = store.get('layout.id');

    if (!cache.layout || cache.layoutName != layoutName) {
        cache.layoutName = layoutName;
        switch (layoutName) {
            default:
            case 'layout1':
                cache.layout = Widget.create(AppLayout);
                break;

            case 'layout2':
                cache.layout = Widget.create(TopMenuLayout);
                break;

            case 'layout3':
                cache.layout = Widget.create(TopTabsLayout);
                break;
        }
    }

    widget.outerLayout = cache.layout;
}

export function selectLayout(x) {
    store.set('layout.id', x);
}
