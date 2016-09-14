import {HtmlElement} from 'cx/ui/HtmlElement';
import {List} from 'cx/ui/List';
import {Grid} from 'cx/ui/grid/Grid';
import {Text} from 'cx/ui/Text';
import {KeySelection} from 'cx/ui/selection/KeySelection';
import {Select} from 'cx/ui/form/Select';

var options = <cx>
    <option value="referral">Referral</option>
    <option value="country">Country</option>
    <option value="city">City</option>
    <option value="browser">Browser</option>
</cx>;

function createSlot(index) {
    return <cx>
        <div class="cse-weba-detailgrid">
            <Grid records={{bind: `$page.details.slot${index}`}} columns={[
                {
                    field: 'name',
                    header: {
                        style: 'width: 200px',
                        items: <cx>
                            <Select value={{bind:`$page.slots.slot${index}`}} required>
                                {options}
                            </Select>
                        </cx>
                    }
                },
                {
                    field: 'value',
                    header: {text: {tpl: '{$page.field.text}'}, style: 'width: 100px' },
                    align: 'right',
                    format: {bind: '$page.field.format'}
                },
                {
                    header: {
                        style: 'width: 100px'
                    },
                    items: <cx>
                        <div class="cse-weba-bar" style={{width: {expr: "100*{$record.value}/{$record.max}+'%'"}}}/>
                    </cx>
                }
            ]}
                  selection={{
                      type: KeySelection,
                      bind: `$page.selected.slot${index}`,
                      keyField: 'name',
                      multiple: true
                  }}/>
        </div>
    </cx>
}

export default <cx>
    <div class="flex-row">
        {[createSlot(0), createSlot(1), createSlot(2), createSlot(3)]}
    </div>
</cx>