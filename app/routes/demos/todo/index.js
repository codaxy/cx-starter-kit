import { HtmlElement, Repeater, TextField, Checkbox, Button, Link } from 'cx/widgets';
import Controller from './Controller';

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
                            <Button onClick="onRemove" mod="hollow" icon="clear"/>
                        </li>
                    </Repeater>
                </ul>
            </div>
        </div>
    </main>
</cx>;

