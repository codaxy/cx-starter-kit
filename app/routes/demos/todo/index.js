import {HtmlElement} from 'cx/ui/HtmlElement';
import {LabelTopLayout} from 'cx/ui/layout';
import {Repeater} from 'cx/ui/Repeater';
import {TextField} from 'cx/ui/form/TextField';
import {Checkbox} from 'cx/ui/form/Checkbox';
import {Button} from 'cx/ui/Button';
import Controller from './Controller';
import {Link} from 'cx/ui/nav/Link';
import {applyOuterLayout} from 'app/layouts/dynamicLayout';

export default <cx>
    <main>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Demos</li>
                <li class="cse-breadcrumb-item">Todo List</li>
            </ul>
        </div>
        <div class="csb-todo-wrap" controller={Controller}>
            <div class="csb-todo">
                <h1>Todo List</h1>

                <div preserveWhitespace>
                    <TextField style={{width: "280px"}}
                               autoFocus
                               value:bind="$page.text"
                               placeholder="Type a task name here"
                    />
                    <Button type="button" onClick="onAdd" disabled:expr="!{$page.text}">Add</Button>
                </div>

                <ul class="csb-task-list">
                    <Repeater records:bind="$page.todos">
                        <li class="csb-task">
                            <Checkbox class={{ "css-task-done": {bind: '$record.done'} }}
                                      text:tpl="{$record.text}" value:bind="$record.done"/>
                            <button onClick="onRemove"/>
                        </li>
                    </Repeater>
                </ul>
            </div>
        </div>
    </main>
</cx>;

