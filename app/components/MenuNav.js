import {HtmlElement} from 'cx/ui/HtmlElement';
import {Repeater} from 'cx/ui/Repeater';
import {Controller} from 'cx/ui/Controller';
import {Text} from 'cx/ui/Text';

import {Link} from 'cx/ui/nav/Link';
import {Menu} from 'cx/ui/nav/Menu';
import {Submenu} from 'cx/ui/nav/Submenu';

import {TreeAdapter} from 'cx/ui/grid/TreeAdapter';
import {History} from 'cx/app/History';
import {Url} from 'cx/app/Url';
import NavTree from './NavTree';
import {updateArray} from 'cx/data/ops/updateArray';
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