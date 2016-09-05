import {Widget} from 'cx/ui/Widget';
import {Window} from 'cx/ui/overlay/Window';
import {HtmlElement} from 'cx/ui/HtmlElement';
import {Button} from 'cx/ui/Button';
import {Tab} from 'cx/ui/nav/Tab';
import {Select, Option} from 'cx/ui/form/Select';
import {LabelsLeftLayout} from 'cx/ui/layout/LabelsLeftLayout';
import {TextField} from 'cx/ui/form/TextField';

const SettingsWindow = <cx>
    <Window title="User Settings" modal center>
        <div putInto="header">
            User Settings
        </div>
        <div style="width:600px;height:400px;padding: 20px" layout={LabelsLeftLayout}>
            <TextField value:bind="user.displayName" label="Display Name" />
            <Select value:bind="layout" label="Layout">
                <Option value="layout1">Layout1</Option>
                <Option value="layout2">Layout2</Option>
                <Option value="layout3">Layout3</Option>
            </Select>
        </div>
        <div putInto="footer" style="text-align: right">
            <Button onClick={(e, instance) => { instance.parentOptions.dismiss() }}>OK</Button>
        </div>
    </Window>
</cx>;

export function openSettingsWindow(store) {
    var win = Widget.create(SettingsWindow);
    win.open(store);
}