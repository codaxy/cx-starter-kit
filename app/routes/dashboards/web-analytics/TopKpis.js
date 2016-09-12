import {HtmlElement} from 'cx/ui/HtmlElement';
import {Text} from 'cx/ui/Text';
import {MonthField} from 'cx/ui/form/MonthField';
import {Svg} from 'cx/ui/svg/Svg';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {LineGraph} from 'cx/ui/svg/charts/LineGraph';

export default <cx>

    <div class="flex-row">
        <div class="cse-weba-kpi">
            <label>Sessions</label>
            <div class="cse-weba-kpi-value">
                <Text tpl="{$page.total.sessions:n;0}" />
            </div>
            <Svg class="cse-weba-kpi-trend">
                <Chart axes={{
                    x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                    y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0}
                }}>
                    <LineGraph data:bind="$page.monthly" xField="month" yField="sessions"/>
                </Chart>
            </Svg>
        </div>

        <div class="cse-weba-kpi">
            <label>Users</label>
            <div class="cse-weba-kpi-value">
                <Text tpl="{$page.total.users:n;0}" />
            </div>
            <Svg class="cse-weba-kpi-trend">
                <Chart axes={{
                    x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                    y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0}
                }}>
                    <LineGraph data:bind="$page.monthly" xField="month" yField="users"/>
                </Chart>
            </Svg>
        </div>

        <div class="cse-weba-kpi">
            <label>Page Views</label>
            <div class="cse-weba-kpi-value">
                <Text tpl="{$page.total.pageViews:n;0}" />
            </div>
            <Svg class="cse-weba-kpi-trend">
                <Chart axes={{
                    x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                    y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0}
                }}>
                    <LineGraph data:bind="$page.monthly" xField="month" yField="pageViews"/>
                </Chart>
            </Svg>
        </div>

        <div class="cse-weba-kpi">
            <label>Pages</label>
            <div class="cse-weba-kpi-value">
                <Text tpl="{$page.total.pageRate:n;2}" />
            </div>
            <Svg class="cse-weba-kpi-trend">
                <Chart axes={{
                    x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                    y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0}
                }}>
                    <LineGraph data:bind="$page.monthly" xField="month" yField="pageRate"/>
                </Chart>
            </Svg>
        </div>

        <div class="cse-weba-kpi">
            <label>Avg. Session Duration</label>
            <div class="cse-weba-kpi-value">
                <Text tpl="{$page.total.avgSessionDuration:n;1} min" />
            </div>
            <Svg class="cse-weba-kpi-trend">
                <Chart axes={{
                    x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                    y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0}
                }}>
                    <LineGraph data:bind="$page.monthly" xField="month" yField="sessions"/>
                </Chart>
            </Svg>
        </div>

        <div class="cse-weba-kpi">
            <label>Bounce Rate</label>
            <div class="cse-weba-kpi-value">
                <Text tpl="{$page.total.bounceRate:p;0}" />
            </div>
            <Svg class="cse-weba-kpi-trend">
                <Chart axes={{
                    x: {type: NumericAxis, hidden: true, snapToTicks: 0},
                    y: {type: NumericAxis, vertical: true, hidden: true, snapToTicks: 0}
                }}>
                    <LineGraph data:bind="$page.monthly" xField="month" yField="bounceRate"/>
                </Chart>
            </Svg>
        </div>

        <MonthField mode="range"
                    from:bind="$page.date.from"
                    to:bind="$page.date.to"
                    required/>
    </div>
</cx>
