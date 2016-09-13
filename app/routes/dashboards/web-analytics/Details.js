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
        <div class="flex1">
            <Grid records:bind="$page.details" columns={[
                { field: 'name', header: { text: { tpl: '{$page.break.text}' }, style: 'width: 200px' } },
                { field: 'value', header: { text: { tpl: '{$page.field.text}', style: 'width: 100px' } }, align: 'right' }
            ]}
            selection={{
                type: KeySelection,
                bind: '$page.selected.detail',
                keyField: 'name',
                multiple: true
            }} />
        </div>
        <div class="flex1">
            <Grid records:bind="$page.details" columns={[
                { field: 'name', header: { text: { tpl: '{$page.break.text}' }, style: 'width: 200px' } },
                { field: 'value', header: { text: { tpl: '{$page.field.text}', style: 'width: 100px' } }, align: 'right' }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.detail',
                      keyField: 'name'
                  }} />
        </div>
        <div class="flex1">
            <Grid records:bind="$page.details" columns={[
                { field: 'name', header: { text: { tpl: '{$page.break.text}' }, style: 'width: 200px' } },
                { field: 'value', header: { text: { tpl: '{$page.field.text}', style: 'width: 100px' } }, align: 'right' }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.detail',
                      keyField: 'name'
                  }} />
        </div>
        <div class="flex1">
            <Grid records:bind="$page.details" columns={[
                { field: 'name', header: { text: { tpl: '{$page.break.text}' }, style: 'width: 200px' } },
                { field: 'value', header: { text: { tpl: '{$page.field.text}', style: 'width: 100px' } }, align: 'right' }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.detail',
                      keyField: 'name'
                  }} />
        </div>
    </div>
</cx>