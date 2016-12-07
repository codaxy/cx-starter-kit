import { HtmlElement, Text, Link, MonthField } from 'cx/widgets';
import { Svg } from 'cx/svg';
import { Chart, NumericAxis, LineGraph } from 'cx/charts';
import { Format } from 'cx/util';




import Controller from './Controller';




import TopKpis from './TopKpis';
import Trend from './Trend';
import Details from './Details';


Format.register('duration', (value) => {
    var hours = Math.floor(value / 3600);
    value = value % 3600;
    var minutes = Math.floor(value / 60);
    var seconds = Math.floor(value % 60);
    return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
});

export default <cx>
    <main class="csb-weba" controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Dashboard</li>
                <li class="cse-breadcrumb-item">Web Analytics</li>
            </ul>
        </div>
        <TopKpis />
        <Trend />
        <Details />
    </main>
</cx>
