import {HtmlElement} from 'cx/ui/HtmlElement';
import {List} from 'cx/ui/List';
import {Grid} from 'cx/ui/grid/Grid';
import {Text} from 'cx/ui/Text';
import {KeySelection} from 'cx/ui/selection/KeySelection';

export default <cx>
    <div class="flex-row">
        <div class="cse-weba-detailgrid">
            <Grid records:bind="$page.details.referal" columns={[
                {field: 'name', header: {text: 'Referal', style: 'width: 200px'}},
                {
                    field: 'value',
                    header: {text: {tpl: '{$page.field.text}'}, style: 'width: 100px'},
                    align: 'right',
                    format: {bind: '$page.field.format'}
                },
                {
                    header: {style: 'width: 100px'}, items: <cx>
                    <div class="cse-weba-bar" style={{width: {expr: "100*{$record.value}/{$record.max}+'%'"}}}/>
                </cx>
                }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.referal',
                      keyField: 'name',
                      multiple: true
                  }}/>
        </div>
        <div class="cse-weba-detailgrid">
            <Grid records:bind="$page.details.country" columns={[
                {field: 'name', header: {text: 'Country', style: 'width: 200px'}},
                {
                    field: 'value',
                    header: {text: {tpl: '{$page.field.text}'}, style: 'width: 100px'},
                    align: 'right',
                    format: {bind: '$page.field.format'}
                },
                {
                    header: {style: 'width: 100px'}, items: <cx>
                    <div class="cse-weba-bar" style={{width: {expr: "100*{$record.value}/{$record.max}+'%'"}}}/>
                </cx>
                }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.country',
                      keyField: 'name',
                      multiple: true
                  }}/>
        </div>
        <div class="cse-weba-detailgrid">
            <Grid records:bind="$page.details.city" columns={[
                {field: 'name', header: {text: 'City', style: 'width: 200px'}},
                {
                    field: 'value',
                    header: {text: {tpl: '{$page.field.text}'}, style: 'width: 100px'},
                    align: 'right',
                    format: {bind: '$page.field.format'}
                },
                {
                    header: {style: 'width: 100px'}, items: <cx>
                    <div class="cse-weba-bar" style={{width: {expr: "100*{$record.value}/{$record.max}+'%'"}}}/>
                </cx>
                }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.city',
                      keyField: 'name',
                      multiple: true
                  }}/>
        </div>
        <div class="cse-weba-detailgrid">
            <Grid records:bind="$page.details.browser" columns={[
                {field: 'name', header: {text: 'Browser', style: 'width: 200px'}},
                {
                    field: 'value',
                    header: {text: {tpl: '{$page.field.text}'}, style: 'width: 100px'},
                    align: 'right',
                    format: {bind: '$page.field.format'}
                },
                {
                    header: {style: 'width: 100px'}, items: <cx>
                    <div class="cse-weba-bar" style={{width: {expr: "100*{$record.value}/{$record.max}+'%'"}}}/>
                </cx>
                }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: '$page.selected.browser',
                      keyField: 'name',
                      multiple: true
                  }}/>
        </div>
    </div>
</cx>