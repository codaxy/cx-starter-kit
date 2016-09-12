import {HtmlElement} from 'cx/ui/HtmlElement';
import {List} from 'cx/ui/List';
import {Grid} from 'cx/ui/grid/Grid';
import {Text} from 'cx/ui/Text';
import {KeySelection} from 'cx/ui/selection/KeySelection';

export default <cx>
    <div class="flex-row">
        <div>
            <List records:bind="$page.breakOptions" selection={{type: KeySelection, bind: '$page.breakBy'}}>
                <Text bind="$record.text" />
            </List>
        </div>
        <div>
            <Grid records:bind="$page.details" columns={[
                { field: 'name', header: { tpl: '$page.break.text' } },
                { field: 'value', header: { tpl: '$page.field.text' } }
            ]} />
        </div>
    </div>
</cx>