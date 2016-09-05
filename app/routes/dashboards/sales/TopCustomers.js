import {HtmlElement} from 'cx/ui/HtmlElement';
import {LabelTopLayout} from 'cx/ui/layout';
import {Repeater} from 'cx/ui/Repeater';
import {TextField} from 'cx/ui/form/TextField';
import {Checkbox} from 'cx/ui/form/Checkbox';
import {Button} from 'cx/ui/Button';
import {applyOuterLayout} from 'app/layouts/dynamicLayout';
import {Svg} from 'cx/ui/svg/Svg';
import {Rectangle} from 'cx/ui/svg/Rectangle';
import {Line} from 'cx/ui/svg/Line';
import {Text} from 'cx/ui/svg/Text';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {CategoryAxis} from 'cx/ui/svg/charts/axis/CategoryAxis';
import {Bar} from 'cx/ui/svg/charts/Bar';
import {Legend} from 'cx/ui/svg/charts/Legend';
import {LineGraph} from 'cx/ui/svg/charts/LineGraph';
import {MarkerLine} from 'cx/ui/svg/charts/MarkerLine';
import {Marker} from 'cx/ui/svg/charts/Marker';
import {Range} from 'cx/ui/svg/charts/Range';
import {computable} from 'cx/data/computable';
import {Format} from 'cx/util/Format';



export const TopCustomers = <cx>
    <div class="cse-dashboard-panel">
        <div class="flex-row">
            <h3 class="flex1">Top 8 Customers</h3>
            <Legend />
        </div>

        <Svg style="width:100%;height:300px">
            <Line anchors="0 1 0 0" offset="20 0 20 0" stroke="gray" />
            <Text anchors="0 1 0 0" offset="15 0 0 0">Customer</Text>
            <Text anchors="0 1 0 0" offset="15 0 0 180">Revenue</Text>

            <Chart margin="20 20 50 180" axes={{
                x: { type: NumericAxis, min: 0 },
                y: { type: CategoryAxis, inverted: true, vertical: true, labelDx: '-180px', labelAnchor: "start", labelOffset: 0 }
            }}>
                <Repeater records:bind="$page.topCustomers">
                    <Bar y:bind="$record.name" x:bind="$record.revenue" style="fill:#666" size={0.4} />
                    <Bar y:bind="$record.name" x0:bind="$record.revenue" x:expr="{$record.revenue}+{$record.pipeline}" style="fill:#ccc" size={0.4} name="Pipeline" />
                </Repeater>
                <Text anchors="1 0.5 1 0.5" textAnchor="middle" offset="30 0 0 0" dy="1em">($1,000s)</Text>
            </Chart>
        </Svg>
    </div>
</cx>;

