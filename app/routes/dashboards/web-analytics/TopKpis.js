import { HtmlElement, Text, MonthField, Tab } from 'cx/widgets';
import { Svg } from 'cx/svg';
import { Chart, NumericAxis, LineGraph } from 'cx/charts';









function selectKpi(e, {store, data}) {
    store.set('$page.selected.field', data.data.field);
}

export default <cx>

    <div class="flex-row">
        <Tab value:bind="$page.selected.field" tab="sessions" mod="kpi">
            <div class="cse-weba-kpi">
                <label>Sessions</label>
                <div class="cse-weba-kpi-value">
                    <Text tpl="{$page.total.sessions:n;0}"/>
                </div>
                <Svg class="cse-weba-kpi-trend">
                    <Chart axes={{
                        x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                        y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0}
                    }}>
                        <LineGraph data:bind="$page.monthly" xField="month" yField="sessions"/>
                    </Chart>
                </Svg>
            </div>
        </Tab>

        <Tab value:bind="$page.selected.field" tab="users" mod="kpi">
            <div class="cse-weba-kpi">
                <label>Users</label>
                <div class="cse-weba-kpi-value">
                    <Text tpl="{$page.total.users:n;0}"/>
                </div>
                <Svg class="cse-weba-kpi-trend">
                    <Chart axes={{
                        x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                        y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0}
                    }}>
                        <LineGraph data:bind="$page.monthly" xField="month" yField="users"/>
                    </Chart>
                </Svg>
            </div>
        </Tab>

        <Tab value:bind="$page.selected.field" tab="pageViews" mod="kpi">
            <div class="cse-weba-kpi">
                <label>Page Views</label>
                <div class="cse-weba-kpi-value">
                    <Text tpl="{$page.total.pageViews:n;0}"/>
                </div>
                <Svg class="cse-weba-kpi-trend">
                    <Chart axes={{
                        x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                        y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0}
                    }}>
                        <LineGraph data:bind="$page.monthly" xField="month" yField="pageViews"/>
                    </Chart>
                </Svg>
            </div>
        </Tab>

        <Tab value:bind="$page.selected.field" tab="pages" mod="kpi">
            <div class="cse-weba-kpi">
                <label>Pages</label>
                <div class="cse-weba-kpi-value">
                    <Text tpl="{$page.total.pages:n;2}"/>
                </div>
                <Svg class="cse-weba-kpi-trend">
                    <Chart axes={{
                        x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                        y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0}
                    }}>
                        <LineGraph data:bind="$page.monthly" xField="month" yField="pages"/>
                    </Chart>
                </Svg>
            </div>
        </Tab>

        <Tab value:bind="$page.selected.field" tab="duration" mod="kpi">
            <div class="cse-weba-kpi">
                <label>Avg. Session Duration</label>
                <div class="cse-weba-kpi-value">
                    <Text tpl="{$page.total.duration:duration}"/>
                </div>
                <Svg class="cse-weba-kpi-trend">
                    <Chart axes={{
                        x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                        y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0}
                    }}>
                        <LineGraph data:bind="$page.monthly" xField="month" yField="duration"/>
                    </Chart>
                </Svg>
            </div>
        </Tab>

        <Tab value:bind="$page.selected.field" tab="bounceRate" mod="kpi">
            <div class="cse-weba-kpi">
                <label>Bounce Rate</label>
                <div class="cse-weba-kpi-value">
                    <Text tpl="{$page.total.bounceRate:p;0}"/>
                </div>
                <Svg class="cse-weba-kpi-trend">
                    <Chart axes={{
                        x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                        y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0, min: 0}
                    }}>
                        <LineGraph data:bind="$page.monthly" xField="month" yField="bounceRate"/>
                    </Chart>
                </Svg>
            </div>
        </Tab>

        <div class="flex2">
            <div class="cse-weba-kpi">
                <label>Period</label>
                <div class="">
                    <MonthField range
                                from:bind="$page.date.from"
                                to:bind="$page.date.to"
                                required/>
                </div>
            </div>
        </div>

    </div>
</cx>
