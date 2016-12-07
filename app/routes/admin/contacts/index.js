import { HtmlElement, Repeater, TextField, Checkbox, Button, List, Link, Text, ValidationGroup } from 'cx/widgets';
import { LabelsTopLayout, KeySelection } from 'cx/ui';
import {Glyph} from 'app/components/Glyph';
import Controller from './Controller';
import {applyOuterLayout} from 'app/layouts/dynamicLayout';


export default <cx>
    <main class="csb-contacts" controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Admin</li>
                <li class="cse-breadcrumb-item">Contacts</li>
            </ul>
        </div>
        <aside class="cse-contacts-list">
            <div class="cse-contacts-toolbar">
                <TextField value:bind="$page.filter.query" mod="search" placeholder="Search Contacts..." />
            </div>
            <List mod="contacts" records:bind="$page.contacts" selection={{ type: KeySelection, bind: '$page.selection.id' }}>
                <div class="cxb-contactcard">
                    <strong><Text tpl="{$record.firstName} {$record.lastName}" /></strong>
                    <br/>
                    <span text:tpl="{$record.email}" class="cxe-contactcard-email" />
                </div>
            </List>
        </aside>
        <article class="cse-contacts-details">
            <div class="cse-contacts-toolbar">
                <Button onClick="onAdd" preserveWhitespace>
                    <Glyph name="plus" /> Add Contact
                </Button>
                <div class="flex1" />
                <Glyph visible:expr="{$page.loading}" name="refresh" style="margin:5px" />
            </div>
            <div class="cxb-contact-form">
                <img style="width:100px;height:100px;float:right; margin-right: 20px"/>
                <h2 text:tpl="{$page.entry.firstName} {$page.entry.lastName}" />

                <ValidationGroup invalid:bind="$page.invalid">
                    <div layout={LabelsTopLayout}>
                        <TextField value:bind="$page.entry.firstName" label="First Name" style="width:200px" required />
                        <TextField value:bind="$page.entry.lastName" label="Last Name" style="width:200px" required />
                    </div>
                    <h5>Email</h5>
                    <div layout={LabelsTopLayout}>
                        <TextField value:bind="$page.entry.email" label="Primary" style="width:200px" />
                        <TextField value:bind="$page.entry.email2" label="Secondary" style="width:200px" />
                    </div>
                    <h5>Phone</h5>
                    <div layout={LabelsTopLayout}>
                        <TextField value:bind="$page.entry.mobilePhone" label="Mobile" style="width:200px" />
                        <TextField value:bind="$page.entry.officePhone" label="Office" style="width:200px" />
                        <TextField value:bind="$page.entry.homePhone" label="Home" style="width:200px" />
                    </div>
                    <h5>Address</h5>
                    <div layout={LabelsTopLayout}>
                        <TextField value:bind="$page.entry.street" label="Street" style="width:350px" />
                        <TextField value:bind="$page.entry.streetNo" label="No." style="width:50px"/>
                    </div>
                    <div layout={LabelsTopLayout}>
                        <TextField value:bind="$page.entry.zip" label="Zip" style="width:100px" />
                        <TextField value:bind="$page.entry.city" label="City" style="width:300px" />
                    </div>
                    <div layout={LabelsTopLayout}>
                        <TextField value:bind="$page.entry.country" label="Country" style="width:200px" />
                        <TextField value:bind="$page.entry.state" label="State" style="width:200px" />
                    </div>
                </ValidationGroup>
                <hr />
                <div class="flex-row">
                    <Button onClick="onSave" disabled:expr="{$page.invalid} || {$page.saving}">Save</Button>
                    <div class="flex1" />
                    <Button onClick="onDelete">Delete</Button>
                </div>
            </div>
        </article>
    </main>
</cx>;

