import { HtmlElement, Repeater,  } from 'cx/widgets';
import { Svg, Rectangle, Line, Text } from 'cx/svg';
import { Chart, NumericAxis, CategoryAxis, Bar, Legend } from 'cx/charts';




export const MarketShare = <cx>
    <Legend.Scope>
    <div class="cse-dashboard-panel">
        <div class="flex-row">
            <h3 class="flex1">Market Share</h3>
            <Legend />
        </div>

        <Svg style="width:100%;height:250px">
            <Line anchors="0 1 0 0" offset="20 0 20 0" stroke="gray" />
            <Text anchors="0 1 0 0" offset="15 0 0 0">Company</Text>
            <Text anchors="0 1 0 0" offset="15 0 0 180">% of Total Market</Text>

            <Chart margin="20 20 50 180" axes={{
                x: { type: NumericAxis, min: 0, format:"ps" },
                y: { type: CategoryAxis, inverted: true, vertical: true, labelDx: '-180px', labelAnchor: "start", labelOffset: 0 }
            }}>
                <Repeater records:bind="$page.marketShare">
                    <Bar y:bind="$record.company" x:bind="$record.share" style={{"fill":{expr: "{$record.highlight} ? '#666' : '#bbb'"}}} size={0.4} />
                    <Bar y:bind="$record.company" x0:bind="$record.lastMonthShare" x:bind="$record.lastMonthShare" style="stroke:#666;stroke-width:1px" size={0.6} name="1 month ago" legendShape="vline" />
                </Repeater>
            </Chart>
        </Svg>
    </div>
    </Legend.Scope>
</cx>;

