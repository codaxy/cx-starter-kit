import {HtmlElement} from 'cx/ui/HtmlElement';
import {LabelsTopLayout} from 'cx/ui/layout/LabelsTopLayout';
import {Repeater} from 'cx/ui/Repeater';
import {TextField} from 'cx/ui/form/TextField';
import {NumberField} from 'cx/ui/form/NumberField';
import {LookupField} from 'cx/ui/form/LookupField';
import {TextArea} from 'cx/ui/form/TextArea';
import {DateField} from 'cx/ui/form/DateField';
import {Checkbox} from 'cx/ui/form/Checkbox';
import {Glyph} from 'app/components/Glyph';
import {Button} from 'cx/ui/Button';
import {Grid} from 'cx/ui/grid/Grid';
import {Link} from 'cx/ui/nav/Link';
import Controller from './Controller';
import {List} from 'cx/ui/List';
import {Text} from 'cx/ui/Text';
import {applyOuterLayout} from 'app/layouts/dynamicLayout';
import {KeySelection} from 'cx/ui/selection/KeySelection';
import {ValidationGroup} from 'cx/ui/form/ValidationGroup';
import {LabelsLeftLayout} from 'cx/ui/layout/LabelsLeftLayout';



export default <cx>
    <main mod="stretched back" controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Admin</li>
                <li class="cse-breadcrumb-item"><Link href="~/admin/orders">Orders</Link></li>
                <li class="cse-breadcrumb-item">
                    <Text tpl="Order {$page.order.orderNo}" visible:expr="!{$page.add}" />
                    <Text tpl="New Order" visible:expr="{$page.add}" />
                </li>
            </ul>
            <Button onClick="onSave" disabled:expr="{$page.saving} || {$page.invalid}">Save</Button>
        </div>
        <div class="csb-order">
            <ValidationGroup invalid:bind="$page.invalid">
                <div class="flex-row pad2">
                    <div style="margin-left:50px">
                        <strong>Order</strong>
                        <div layout={LabelsLeftLayout}>
                            <TextField value:bind="$page.order.orderNo" label="Order No." readOnly placeholder="Auto assigned" />
                            <DateField value:bind="$page.order.date" label="Date" required visited/>
                            <TextField value:bind="$page.order.status" label="Status" />
                        </div>
                    </div>
                    <div style="margin-left:50px">
                        <strong>Customer</strong>
                        <div layout={LabelsLeftLayout}>
                            <TextField value:bind="$page.order.customer" label="Customer" required visited/>
                            <TextField value:bind="$page.order.email" label="Email" />
                            <TextField value:bind="$page.order.country" label="Country" />
                            <TextField value:bind="$page.order.city" label="City" />
                        </div>
                    </div>
                    <div style="margin-left:50px">
                        <strong>Extra</strong>
                        <div layout={LabelsLeftLayout}>
                            <TextArea value:bind="$page.order.notes" label="Notes" rows={8} />
                        </div>
                    </div>
                </div>
                <hr />
                <div class="pad2">
                    <Grid records:bind="$page.orderItems"
                          lockColumnWidths
                          columns={[
                              { header: 'Product', field: 'productName', items: <cx>
                                  <LookupField value:bind="$record.productId"
                                               text:bind="$record.productName"
                                               style="width:100%;"
                                               onQuery="onQueryProducts"
                                               required
                                               optionTextField="name"
                                               autoFocus:expr="{$record.id} < 0"
                                               bindings={[
                                                   { local: '$record.productId', remote: '$option.id', key: true },
                                                   { local: '$record.productName', remote: '$option.name' },
                                                   { local: '$record.unitPrice', remote: '$option.unitPrice' },
                                                   { local: '$record.taxPct', remote: '$option.taxPct' }
                                               ]} />
                              </cx>  },
                              { header: 'Qty', field: 'qty', align: 'right', items: <cx>
                                  <NumberField value:bind="$record.qty" style="width:70px;" inputStyle="text-align: right" required />
                              </cx> },
                              { header: 'Discount', field: 'discountPct', align: 'right', items: <cx>
                                  <NumberField value:bind="$record.discountPct" style="width:70px;" inputStyle="text-align: right" format="ps" maxValue={100} />
                              </cx> },
                              { header: 'Unit Price', field: 'unitPrice', align: 'right', format: 'currency' },
                              { header: 'Regular', field: 'regularAmount', align: 'right', format: 'currency' },
                              { header: 'Discount', field: 'discountAmount', align: 'right', format: 'currency' },
                              { header: 'Tax', field: 'taxAmount', align: 'right', value:{ tpl: "{$record.taxAmount:currency} {$record.taxPct:ps:wrap;(;)}" } },
                              { header: 'Total', field: 'totalAmount', align: 'right', format: 'currency' },
                              { align: 'right', items: <cx>
                                  <Button onClick="onRemoveItem" mod="hollow">
                                      <Glyph name="remove" />
                                  </Button>
                              </cx>}
                          ]}
                    />
                    <Button style="margin: 6px 0 12px 4px;" text="Add" onClick="onAddItem" />
                </div>
                <hr />
                <div class="pad2 flex-row">
                    <div layout={LabelsLeftLayout} style="margin-left: auto">
                        <NumberField value:bind="$page.order.regularAmount" label="Regular Price" readOnly inputStyle="text-align: right" format="currency"/>
                        <NumberField value:bind="$page.order.taxAmount" label="Discount" readOnly inputStyle="text-align: right" format="currency"/>
                        <NumberField value:bind="$page.order.discountAmount" label="Tax" readOnly inputStyle="text-align: right" format="currency"/>
                        <NumberField value:bind="$page.order.totalAmount" label="Total" readOnly inputStyle="text-align: right; font-weight: bold" format="currency"/>
                    </div>
                </div>
            </ValidationGroup>
        </div>
    </main>
</cx>;
