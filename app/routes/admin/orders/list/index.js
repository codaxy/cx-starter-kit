import { HtmlElement, Repeater, TextField, NumberField, MonthField, Select, Checkbox, Button, Grid, Pagination, Link, List, Text, ValidationGroup } from 'cx/widgets';
import { LabelsTopLayout, KeySelection } from 'cx/ui';








import {Glyph} from 'app/components/Glyph';




import Controller from './Controller';


import {applyOuterLayout} from 'app/layouts/dynamicLayout';




export default <cx>
    <main class="csb-orderlist" controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Admin</li>
                <li class="cse-breadcrumb-item">Orders</li>
            </ul>
            <Button text="New Order" onClick="onNewOrder"/>
            <Glyph visible:expr="{$page.loading}" name="refresh"/>
        </div>
        <Grid
            records:bind="$page.records"
            mod="orders"
            class="flex1"
            scrollable
            border={false}
            remoteSort
            lockColumnWidths
            sorters:bind="$page.filter.sorters"
            columns={[
                {
                    field: 'orderNo', sortable: true,
                    items: <cx>
                        <Link href:tpl="~/admin/orders/{$record.id}" text:tpl="{$record.orderNo}"/>
                    </cx>,
                    header: {
                        style: 'width: 150px',
                        items: <cx>
                            <div>
                                Order No.
                                <br/>
                                <NumberField style="width:100%;margin-top:5px" value:bind="$page.filter.orderNo"
                                    reactOn="enter blur"/>
                            </div>
                        </cx>
                    },
                },
                {
                    field: 'date', format: 'd', sortable: true,
                    header: {
                        style: 'width: 220px',
                        items: <cx>
                            <div>
                                Date
                                <br/>
                                <MonthField style="width:100%;margin-top:5px" range from:bind="$page.filter.dateFrom"
                                    to:bind="$page.filter.dateTo"/>
                            </div>
                        </cx>
                    }
                },
                {
                    field: 'customer', sortable: true,
                    header: {
                        items: <cx>
                            <div>
                                Customer
                                <br/>
                                <TextField style="width:100%;margin-top:5px" value:bind="$page.filter.customer"/>
                            </div>
                        </cx>
                    }
                },
                {
                    field: 'country', sortable: true,
                    header: {
                        items: <cx>
                            <div>
                                Country
                                <br/>
                                <TextField style="width:100%;margin-top:5px" value:bind="$page.filter.country"/>
                            </div>
                        </cx>
                    }
                },
                {
                    field: 'city', sortable: true,
                    header: {
                        items: <cx>
                            <div>
                                City
                                <br/>
                                <TextField style="width:100%;margin-top:5px" value:bind="$page.filter.city"/>
                            </div>
                        </cx>
                    }
                },
                {header: 'Total', field: 'totalAmount', format: 'currency;;2', align: 'right', sortable: true},
            ]}>
        </Grid>
        <div style="padding: 5px">
            <Pagination page:bind="$page.page" pageCount:bind="$page.pageCount"/>
            <Select value:bind="$page.pageSize" style={{float: 'right'}}>
                <option value="5">5</option>
                <option value={10}>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </Select>
        </div>
    </main>
</cx>;

