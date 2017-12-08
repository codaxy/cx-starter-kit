import { HtmlElement, Text, MonthField, Repeater } from 'cx/widgets';
import { Svg } from 'cx/svg';
import { Chart, NumericAxis, TimeAxis, LineGraph, Gridlines, Marker } from 'cx/charts';












export default <cx>
    <div class="">
        <Svg class="cse-weba-trend">
            <Chart margin="10 5 60 60" axes={{
                x: { type: TimeAxis, snapToTicks: 0, minTickDistance: 70, minLabelDistance: 70 },
                y: { type: NumericAxis, vertical: true, snapToTicks: 1, min: 0}
            }}>
                <Gridlines />
                <LineGraph data:bind="$page.monthly" xField="date" yField="value" area colorIndex={8}/>
                <Repeater records:bind="$page.monthly">
                    <Marker x:bind="$record.date" y:bind="$record.value" colorIndex={8} size={10}
                            tooltip:tpl="{$record.value:n;0;2} in {$record.date:datetime;yyyyMMM}" />
                </Repeater>
            </Chart>
        </Svg>
    </div>
</cx>
