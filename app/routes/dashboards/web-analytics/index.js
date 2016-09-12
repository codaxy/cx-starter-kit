import {HtmlElement} from 'cx/ui/HtmlElement';
import {Text} from 'cx/ui/Text';
import {MonthField} from 'cx/ui/form/MonthField';
import Controller from './Controller';
import {Svg} from 'cx/ui/svg/Svg';
import {Chart} from 'cx/ui/svg/charts/Chart';
import {NumericAxis} from 'cx/ui/svg/charts/axis/NumericAxis';
import {LineGraph} from 'cx/ui/svg/charts/LineGraph';
import TopKpis from './TopKpis';
import Trend from './Trend';
import Details from './Details';

export default <cx>
    <main class="csb-weba" controller={Controller}>
        <TopKpis />
        <Trend />
        <Details />
    </main>
</cx>
