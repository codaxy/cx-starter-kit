import {HtmlElement} from 'cx/ui/HtmlElement';
import {Repeater} from 'cx/ui/Repeater';
import {Controller} from 'cx/ui/Controller';
import {Text} from 'cx/ui/Text';

import {Link} from 'cx/ui/nav/Link';
import {Tab} from 'cx/ui/nav/Tab';

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

        this.addTrigger('active-topic-expand', ['url', 'contents'], (url, contents) => {
            contents.forEach(t => {
                if (t.articles.some(x=>url.indexOf(x.url) == 0))
                    this.store.set('activeTab', t.topic);
            });
        }, true);
    }
}

export const TabNav = <cx>
    <div controller={CController} class="csb-tabnav">
        <div class="cse-tabnav-tabs">
            <Repeater records:bind="contents" recordName="$topic">
                <Tab value:bind="activeTab" tab:bind="$topic.topic" text:bind="$topic.topic" mod="classic"></Tab>
            </Repeater>
        </div>
        <div class="cse-tabnav-links">
            <Repeater records:bind="contents" recordName="$topic">
                <Repeater records:bind="$topic.articles" recordName="$page" visible:expr="{activeTab}=={$topic.topic}">
                    <Link href:bind="$page.url" url:bind="url" mod="tabnav">
                        <Glyph name:expr="{$page.glyph} || 'file-text-o'" />
                        <Text bind="$page.title" />
                    </Link>
                </Repeater>
            </Repeater>
        </div>
    </div>
</cx>;