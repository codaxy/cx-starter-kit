import { HtmlElement, Repeater, Text, Link, Tab, TreeAdapter } from 'cx/widgets';
import { Controller, History, Url } from 'cx/ui';
import { updateArray } from 'cx/data';


import NavTree from './NavTree';
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