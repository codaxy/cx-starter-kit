import { HtmlElement, Button, Text, Link } from 'cx/widgets';
import { Controller } from 'cx/ui';





import {TopTabsLayout} from 'app/layouts/TopTabsLayout';
import {Md} from 'app/components/Md';
import {selectLayout} from 'app/layouts/dynamicLayout'


export default <cx>
    <Md outerLayout={TopTabsLayout} class="content-pad">
        ### Layout 3

        This layout is used for ...

        <div preserveWhitespace>
            <Button onClick={ e=>{ selectLayout('layout3') }} disabled:expr="{layout}=='layout3'">Keep it</Button>
            <Text visible:expr="{layout}=='layout3'" value="This is the currently selected layout." />
        </div>
    </Md>
</cx>

