import { HtmlElement, Repeater } from 'cx/widgets';
import { Svg, Rectangle, Line, Text } from 'cx/svg';
import { Chart, NumericAxis, CategoryAxis, Bar, Legend, LineGraph, Marker, Range } from 'cx/charts';
import { computable } from 'cx/data';
import { Format } from 'cx/util';

export const ProductSalesYTD = <cx>
    <Legend.Scope>
        <div class="cse-dashboard-panel">
            <div class="flex-row">
                <h3>Product Sales YTD</h3>
                <div style="margin-left: 50px;">
                    <Legend style="display:inline-block" />
                </div>
            </div>

            <Svg style="width:100%;height:220px">
                <Line anchors="0 1 0 0" offset="20 0 20 0" stroke="gray" />
                <Chart margin="20 0 50 0" padding="0 270 0 0" axes={{
                    revenue: { type: NumericAxis, min: 0, anchors: "0 1 1 0.67", offset:"0 175 0 175", labelDivisor: 1000 },
                    units: { type: NumericAxis, min: 0, anchors: "0 0.67 1 0.34", offset:"0 150 0 150", labelDivisor: 1000 },
                    y: { type: CategoryAxis, inverted: true, vertical: true, labelDx: '-150px', labelAnchor: "start", labelOffset: 0, hidden: true }
                }}>
                    <Text anchors="0 1 0 0" offset="-5 0 0 0">Past 12 Months</Text>
                    <Text anchors="0 0 0 0.34" offset="-5 0 0 30">Region</Text>
                    <Text anchors="0 0.34 0 0.34" offset="-5 0 0 150">Units vs Target</Text>
                    <Text anchors="0 0.67 0 0.67" offset="-5 0 0 175">Units vs Target</Text>
                    <Text anchors="0 1 0 1" offset="-5 0 0 270" textAnchor="end">Actual</Text>
                    <Repeater records:bind="$page.productSalesYTD">
                        <Range y1:bind="$record.product" y2:bind="$record.product" ySize={1} hidden>
                            <Rectangle anchors="0.1 0.34 0.9 0" style="stroke:#eee;fill:transparent">
                                <Chart axes={{
                                    x2: { type: NumericAxis, hidden: true },
                                    y2: { type: NumericAxis, vertical: true, hidden: true }
                                }}>
                                    <LineGraph xAxis="x2" yAxis="y2" data:bind="$record.trend"  />
                                </Chart>
                            </Rectangle>
                            <Marker visible:expr="{$record.revenue} < {$record.target}" anchors="0.5 0.34 0.5 0.34" offset="0 15 0 15" style="fill:red;stroke:none" size="10" />
                            <Text value:bind="$record.product" anchors="0.5 0.34 0.5 0.34" offset="0 0 0 0" dy="0.4em" dx="30px" />
                            <Text value:tpl="{$record.revenue:n}" anchors="0.5 1 0.5 1" dx="270px" dy="0.4em" textAnchor="end" />
                        </Range>
                        <Bar y:bind="$record.product" x:bind="$record.revenue" xAxis="revenue" style="fill:#666" size={0.4} name="Revenue" />
                        <Bar y:bind="$record.product" x0:bind="$record.target" x:bind="$record.target" xAxis="revenue" style="stroke:black;stroke-width:1" size={0.6} />
                        <Bar y:bind="$record.product" x:bind="$record.units" xAxis="units" style="fill:#666" size={0.4} name="Revenue" />
                        <Bar y:bind="$record.product" x0:bind="$record.unitsTarget" x:bind="$record.unitsTarget" xAxis="units" style="stroke:black;stroke-width:1" size={0.6} />
                    </Repeater>
                    <Text anchors="1 0.67 1 0.67" textAnchor="middle" offset="30 165 0 165" dy="1em">($1,000s)</Text>
                    <Line anchors="1 1 1 1" offset="0 270 0 200" stroke="gray" />
                    <Text anchors="1 1 1 1" offset="5 270 0 270" textAnchor="end" dy="1em" value={computable("$page.productSalesYTD", rev => Format.value(rev.reduce((a, b)=>a+b.revenue, 0), 'n'))}/>
                </Chart>
            </Svg>
        </div>
    </Legend.Scope>
</cx>;

