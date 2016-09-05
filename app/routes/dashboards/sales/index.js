import {HtmlElement} from 'cx/ui/HtmlElement';
import {LabelTopLayout} from 'cx/ui/layout';
import {Repeater} from 'cx/ui/Repeater';
import {TextField} from 'cx/ui/form/TextField';
import {Checkbox} from 'cx/ui/form/Checkbox';
import {Button} from 'cx/ui/Button';
import Controller from './Controller';
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
import {Link} from 'cx/ui/nav/Link';

import {KeyMetrics} from './KeyMetrics';
import {TopCustomers} from './TopCustomers';
import {RevenueQTD} from './RevenueQTD';
import {RevenueYTD} from './RevenueYTD';
import {ProductSalesYTD} from './ProductSalesYTD';
import {MarketShare} from './MarketShare';




export default <cx>
    <main controller={Controller}>
        <div putInto="header">
            <ul class="csb-breadcrumb">
                <li class="cse-breadcrumb-item"><Link href="~/">Home</Link></li>
                <li class="cse-breadcrumb-item">Dashboard</li>
                <li class="cse-breadcrumb-item">Sales</li>
            </ul>
        </div>
        <header class="cse-applayout-contentheader">
            <h4>Implementation of the Sales Dashboard example from the book "<a href="https://www.amazon.com/Information-Dashboard-Design-At-Glance/dp/1938377001">
                Information Dashboard Design</a>" by Stephen Few</h4>
        </header>
        <div class="csb-dashboard">
            <div class="flex-row flex-stretch">
                <div class="flex3">
                    <KeyMetrics/>
                </div>
                <div class="flex2">
                    <TopCustomers/>
                </div>
            </div>

            <div class="flex-row flex-stretch">
                <div class="flex2">
                    <RevenueQTD/>
                </div>
                <div class="flex3">
                    <RevenueYTD/>
                </div>
            </div>

            <div class="flex-row flex-stretch">
                <div class="flex3">
                    <ProductSalesYTD/>
                </div>
                <div class="flex2">
                    <MarketShare/>
                </div>
            </div>
        </div>
    </main>
</cx>;

