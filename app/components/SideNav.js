import { HtmlElement, List, Repeater, Text, Link, Menu, TreeAdapter } from 'cx/widgets';
import { Controller, KeySelection, History, Url } from 'cx/ui';
import { updateArray } from 'cx/data';
import NavTree from './NavTree';
import {Glyph} from 'app/components/Glyph';

class CController extends Controller {
    init() {
        super.init();
        this.store.init('contents', NavTree);

        this.addTrigger('active-topic-expand', ['url'], (url) => {
            this.store.update('contents', updateArray, t => ({
                ...t,
                expanded: true
            }), t=>!t.expanded && t.articles.some(x=>url.indexOf(x.url) == 0))
        }, true);
    }
}

const onItemClick = (e, {store}) => {
    e.preventDefault();
    e.stopPropagation();
    var record = store.get('$topic');
    if (record.url)
        History.pushState({}, null, Url.resolve(record.url));
    else
        store.set('$topic.expanded', !record.expanded);
    return false;
};

export const SideNav = <cx>
    <List mod="sidenav"
          controller={CController}
          records:bind="contents"
          recordName="$topic"
          adapter={{type: TreeAdapter, childrenField: 'articles', expandedField: 'expanded'}}
          onItemClick={onItemClick}
          itemClassName={{
              "cxs-selected": { expr: '{url}=={$topic.url}' }
          }}
    >
        <div visible:expr="{$topic.$level} == 0" preserveWhitespace
             class={{
                 "csb-sidenavtopic": true,
                 "css-expanded": {expr: "{$topic.expanded}"},
                 "css-collapsed": {expr: "!{$topic.expanded}"}
             }}>

            <Text bind="$topic.topic"/>
            <i class="csb-cssicon-arrowleft" style="float:right"></i>
        </div>

        <Link visible:expr="{$topic.$level} > 0"
              href:bind="$topic.url"
              url:bind="url"
              match="prefix"
              mod="sidenav"
              tabIndex={-1}>
            <Glyph name:expr="{$topic.glyph} || 'file-text-o'" />
            <Text bind="$topic.title" />
        </Link>

    </List>
</cx>;
