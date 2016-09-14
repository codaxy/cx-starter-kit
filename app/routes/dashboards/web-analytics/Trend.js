import {HtmlElement} from 'cx/ui/HtmlElement';
import {Text} from 'cx/ui/Text';
import {MonthField} from 'cx/ui/form/MonthField';
import {Svg} from 'cx/ui/svg/Svg';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {TimeAxis} from 'cx/ui/svg/charts/axis/TimeAxis';
import {LineGraph} from 'cx/ui/svg/charts/LineGraph';
import {Gridlines} from 'cx/ui/svg/charts/Gridlines';
import {Marker} from 'cx/ui/svg/charts/Marker';
import {Repeater} from 'cx/ui/Repeater';

export default <cx>
    <div class="">
        <Svg class="cse-weba-trend">
            <Chart margin="10 5 60 60" axes={{
                x: { type: TimeAxis, snapToTicks: 0, minTickDistance: 80, minLabelDistance: 80 },
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
