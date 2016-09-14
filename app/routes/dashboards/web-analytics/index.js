import {HtmlElement} from 'cx/ui/HtmlElement';
import {Text} from 'cx/ui/Text';
import {Link} from 'cx/ui/nav/Link';
import {MonthField} from 'cx/ui/form/MonthField';
import Controller from './Controller';
import {Svg} from 'cx/ui/svg/Svg';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {LineGraph} from 'cx/ui/svg/charts/LineGraph';
import TopKpis from './TopKpis';
import Trend from './Trend';
import Details from './Details';
import {Format} from 'cx/util/Format';

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
