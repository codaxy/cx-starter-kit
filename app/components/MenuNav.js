import { HtmlElement, Repeater, Text, Link, Menu, Submenu, TreeAdapter } from 'cx/widgets';
import { Controller, History, Url } from 'cx/ui';
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
                active: t.articles.some(x=>url.indexOf(x.url) == 0)
            }), t=>t.active != t.articles.some(x=>url.indexOf(x.url) == 0))
        }, true);
    }
}

export const MenuNav = <cx>
    <Menu mod="menunav"
          horizontal
          controller={CController}>

        <Repeater records:bind="contents" recordName="$topic">
            <Submenu mod="menunav"
                     class={{
                "cxs-active": { bind: "$topic.active" }
            }}>
                <Text bind="$topic.topic" />
                <Menu putInto="dropdown">
                    <Repeater records:bind="$topic.articles" recordName="$article">
                        <Link href:bind="$article.url"
                              mod="menunav"
                              url:bind="url">
                            <Glyph name:expr="{$article.glyph} || 'file-text-o'" />
                            <Text bind="$article.title" />
                        </Link>
                    </Repeater>
                </Menu>
            </Submenu>
        </Repeater>
    </Menu>
</cx>