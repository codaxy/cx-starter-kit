import { HtmlElement, Repeater } from 'cx/widgets';
import { Svg, Rectangle, Line, Text } from 'cx/svg';
import { Chart, NumericAxis, CategoryAxis, Bar, Legend, Marker, Range } from 'cx/charts';
import { computable } from 'cx/data';
import { Format } from 'cx/util';

export const RevenueQTD = <cx>
    <Legend.Scope>
        <div class="cse-dashboard-panel">
            <div class="flex-row">
                <h3>Revenue QTD</h3>
                <div style="margin-left: 50px;">
                    Pipeline:
                    <Legend style="display:inline-block" />
                </div>
            </div>

            <Svg style="width:100%;height:220px">
                <Line anchors="0 1 0 0" offset="20 0 20 0" stroke="gray" />
                <Text anchors="0 1 0 0" offset="15 0 0 30">Region</Text>
                <Text anchors="0 1 0 0" offset="15 0 0 150">Actual and Pipeline vs Target</Text>
                <Text anchors="0 1 0 1" offset="15 0 0 0" textAnchor="end">Actual</Text>

                <Chart margin="20 0 50 0" axes={{
                    x: { type: NumericAxis, min: 0, margin:"0 120 0 150", labelDivisor: 1000 },
                    y: { type: CategoryAxis, inverted: true, vertical: true, labelDx: '-150px', labelAnchor: "start", labelOffset: 0, hidden: true }
                }}>
                    <Repeater records:bind="$page.revenueQTD">
                        <Range y1:bind="$record.region" y2:bind="$record.region" ySize={1} hidden>
                            <Marker visible:expr="{$record.revenue} + {$record.pipeline90} < {$record.target}" anchors="0.5 0 0.5 0" offset="0 15 0 15" style="fill:red;stroke:none" size="10" />
                            <Text value:bind="$record.region" anchors="0.5 0 0.5 0" dy="0.4em" dx="30px" />
                            <Text value:tpl="{$record.revenue:n}" anchors="0.5 1 0.5 1" dy="0.4em" textAnchor="end" />
                        </Range>
                        <Bar y:bind="$record.region" x:bind="$record.revenue" style="fill:#666" size={0.4} />
                        <Bar y:bind="$record.region" x0:bind="$record.revenue" x:expr="{$record.revenue}+{$record.pipeline75}" style="fill:#eee" size={0.4} name="75%" />
                        <Bar y:bind="$record.region" x0:bind="$record.revenue" x:expr="{$record.revenue}+{$record.pipeline90}" style="fill:#ddd" size={0.4} name="90%" />
                        <Bar y:bind="$record.region" x0:bind="$record.target" x:bind="$record.target" style="stroke:black;stroke-width:1" size={0.6} />
                    </Repeater>
                    <Text anchors="1 0.5 1 0.5" textAnchor="middle" offset="30 0 0 0" dy="1em">($1,000s)</Text>
                    <Line anchors="1 1 1 1" offset="0 0 0 -100" stroke="gray" />
                    <Text anchors="1 1 1 1" offset="5 0 0 0" textAnchor="end" dy="1em" value={computable("$page.revenueQTD", rev => Format.value(rev.reduce((a, b)=>a+b.revenue, 0), 'n'))}/>
                </Chart>
            </Svg>
        </div>
    </Legend.Scope>
</cx>;

