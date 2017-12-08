import { HtmlElement, Repeater } from 'cx/widgets';
import { Svg, Rectangle, Line, Text } from 'cx/svg';
import { Chart, NumericAxis, CategoryAxis, Bar, Legend, LineGraph, MarkerLine, Marker, Range } from 'cx/charts';
import { computable } from 'cx/data';
import { Format } from 'cx/util';

export const RevenueYTD = <cx>
    <Legend.Scope>
        <div class="cse-dashboard-panel">
            <div class="flex-row">
                <h3>Revenue YTD</h3>
                <div style="margin-left: 50px;">
                    <Legend style="display:inline-block" />
                </div>
            </div>

            <Svg style="width:100%;height:220px">
                <Line anchors="0 1 0 0" offset="20 0 20 0" stroke="gray" />
                <Text anchors="0 1 0 0" offset="15 0 0 0">Past 12 Months</Text>
                <Text anchors="0 1 0 0" offset="15 0 0 230">Region</Text>
                <Text anchors="0 1 0 0" offset="15 0 0 350">Actual and Pipeline vs Target</Text>
                <Text anchors="0 1 0 1" offset="15 0 0 0" textAnchor="end">Actual</Text>

                <Chart margin="20 0 50 0" axes={{
                    x: { type: NumericAxis, min: 0, margin:"0 120 0 350", labelDivisor: 1000 },
                    y: { type: CategoryAxis, inverted: true, vertical: true, labelDx: '-150px', labelAnchor: "start", labelOffset: 0, hidden: true }
                }}>
                    <Repeater records:bind="$page.revenueYTD">
                        <Range y1:bind="$record.region" y2:bind="$record.region" ySize={1} hidden>
                            <Rectangle anchors="0.1 0 0.9 0" offset="0 200 0 0" style="stroke:#eee;fill:transparent">
                                <Chart axes={{
                                    x2: { type: NumericAxis, hidden: true },
                                    y2: { type: NumericAxis, vertical: true, hidden: true }
                                }}>
                                    <LineGraph xAxis="x2" yAxis="y2" data:bind="$record.trend"  />
                                </Chart>
                            </Rectangle>
                            <Marker visible:expr="{$record.revenue} < {$record.target}" anchors="0.5 0 0.5 0" offset="0 215 0 215" style="fill:red;stroke:none" size="10" />
                            <Text value:bind="$record.region" anchors="0.5 0 0.5 0" dy="0.4em" dx="230px" />
                            <Text value:tpl="{$record.revenue:n}" anchors="0.5 1 0.5 1" dy="0.4em" textAnchor="end" />
                        </Range>
                        <Bar y:bind="$record.region" x:bind="$record.revenue" style="fill:#666" size={0.4} name="Revenue" />
                        <Bar y:bind="$record.region" x0:bind="$record.target" x:bind="$record.target" style="stroke:black;stroke-width:1" size={0.6} />
                    </Repeater>
                    <Text anchors="1 0.5 1 0.5" textAnchor="middle" offset="30 0 0 0" dy="1em">($1,000s)</Text>
                    <Line anchors="1 1 1 1" offset="0 0 0 -100" stroke="gray" />
                    <Text anchors="1 1 1 1" offset="5 0 0 0" textAnchor="end" dy="1em" value={computable("$page.revenueYTD", rev => Format.value(rev.reduce((a, b)=>a+b.revenue, 0), 'n'))}/>
                </Chart>
            </Svg>
        </div>
    </Legend.Scope>
</cx>;

