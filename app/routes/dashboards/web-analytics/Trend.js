import {HtmlElement} from 'cx/ui/HtmlElement';
import {Text} from 'cx/ui/Text';
import {MonthField} from 'cx/ui/form/MonthField';
import {Svg} from 'cx/ui/svg/Svg';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {TimeAxis} from 'cx/ui/svg/charts/axis/TimeAxis';
import {LineGraph} from 'cx/ui/svg/charts/LineGraph';
import {Gridlines} from 'cx/ui/svg/charts/Gridlines';

export default <cx>
    <div class="">
        <Svg class="cse-weba-trend">
            <Chart margin="10 50 30 100" axes={{
                x: {type: TimeAxis, snapToTicks: 1, minLabelDistance: 80, format: "datetime;yyyyMMM"},
                y: {type: NumericAxis, vertical: true, snapToTicks: 1, min: 0}
            }}>
                <Gridlines />
                <LineGraph data:bind="$page.monthly" xField="date" yField="value" area colorIndex={8}/>
            </Chart>
        </Svg>
    </div>
</cx>
