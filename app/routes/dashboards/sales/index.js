import { HtmlElement, Link } from 'cx/widgets';

import Controller from './Controller';
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

