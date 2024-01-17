import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Amount } from '../interfaces';
import {
  addLegendToGradient,
  addMarkerLinear,
  Any,
  appendDLine,
  appendSeriesPath,
  appliedOpacity,
  createAxis,
  createNewGroup,
  createNewSvg,
  createScale,
  getHeight,
  onHover,
  stackedSeries,
} from '@graph';
import * as d3 from 'd3';
import { getWidth } from '../../../../../graph/src/lib/graph/util/helpers/layout';

@Injectable({
  providedIn: 'root',
})
export class AmmountDataService {
  private _httpClient = inject(HttpClient);
  private strokeWidth: number = 1.2;
  amountData$: Observable<Amount> = of('das').pipe(
    //eslint-disable-next-line
    tap((v: Any) => {
      const data = [
        {
          valueMoney: 0,
          month: '01.01.2021',
          contrastMoney: 0,
        },
        {
          valueMoney: 0.2,
          month: '08.01.2021',
          contrastMoney: 0.2,
        },
        {
          valueMoney: 0.4,
          month: '01.01.2022',
          contrastMoney: 0.3,
        },
        {
          valueMoney: 1.5,
          month: '01.01.2024',
          contrastMoney: 1,
        },
        {
          valueMoney: 2,
          month: '01.01.2025',
          contrastMoney: 1.25,
        },
        {
          valueMoney: 2.75,
          month: '01.05.2026',
          contrastMoney: 1.5,
        },
      ] as Any;
      const configGraph = {
        marginTop: 10,
        marginRight: 10,
        marginBottom: 20,
        marginLeft: 20,
        color: ['lightgreen', 'lightblue'],
        height: 300,
        width: 600,
        strokeWidth: 1.5,
      };

      const svgWrapper = createNewSvg('#chart', configGraph, d3);
      const graphWrapper = createNewGroup(svgWrapper).attr(
        'transform',
        `translate(${configGraph.marginLeft}, 0)`,
      );

      appliedOpacity(graphWrapper);

      const width = getWidth(svgWrapper, configGraph);
      const height = getHeight(svgWrapper, configGraph);
      const graph = createNewGroup(graphWrapper).attr(
        'transform',
        `translate(-${configGraph.marginLeft - configGraph.strokeWidth}, ${
          configGraph.marginTop
        })`,
      );

      const stackValues = stackedSeries(
        data,
        ['contrastMoney', 'valueMoney'],
        d3,
      );
      const stackedData = stackValues.map((layer: Any) =>
        layer.map((d: Any, i: number) => ({ values: d, month: data[i].month })),
      );

      // Create scales

      const yScale = createScale(
        d3,
        'linear',
        [height, 0],
        [
          0,
          d3.max(
            stackValues[stackValues.length - 1],
            (dp: Any) => dp[1],
          ) as Any,
        ],
      );
      const xScale = createScale(
        d3,
        'time',
        [0, width],
        d3.extent(data, (dataPoint: Any) => new Date(dataPoint.month)) as Any,
      );

      const area = d3
        .area()
        .x((dataPoint: Any) => xScale(new Date(dataPoint.month)))
        .y0((dataPoint: Any) => yScale(dataPoint.values[0]))
        .y1((dataPoint: Any) => yScale(dataPoint.values[1]))
        .curve(d3.curveNatural);

      const series = graph.selectAll('.series').data(stackedData).enter();

      const pathD = appendDLine(
        appendSeriesPath(series, configGraph)
          .style('fill', (d: Any, i: number) => configGraph.color[i])
          .attr('transform', `translate(${configGraph.marginLeft},0)`),
        (d: Any) => area(d),
      );
      const areaGenY = d3
        .area()
        .x((d: any) => xScale(new Date(d.month)))
        .y0((d: any) => yScale(d.contrastMoney))
        .y1((d: any) =>
          yScale(
            d.valueMoney <= 0.1
              ? d.valueMoney
              : d.valueMoney + d.valueMoney / 2 === 0
                ? 0
                : d.valueMoney + d.valueMoney / 4,
          ),
        )
        .curve(d3.curveNatural);

      const areaPathY = appendDLine(
        appendSeriesPath(graph, configGraph, 'none')
          .data([data])
          .style('fill', 'rgba(252,177,177,0.45)')
          .attr('transform', 'translate(20,0)'), // Setează culoarea de fundal
        areaGenY,
      );
      const middleAxis = createAxis(
        d3,
        xScale,
        'bottom',
        [0, height + 10],
        graphWrapper,
        data.length,
      );
      const leftAxis = createAxis(d3, yScale, 'left', [5, 10], graphWrapper);

      const markerDate = new Date('01.01.2025');
      const markerDataEntry = data.find(
        (entry: Any) =>
          new Date(entry.month).getTime() === markerDate.getTime(),
      );

      const markerValue = markerDataEntry
        ? markerDataEntry.contrastMoney + markerDataEntry.valueMoney
        : 0;

      // Calculate x and y positions for the circle marker based on the scales
      const marker = addMarkerLinear(
        xScale,
        yScale,
        markerDate,
        markerValue,
        graphWrapper,
        height,
        configGraph,
      );

      marker.attr('transform', 'translate(0, 10)');

      onHover(marker, d3);

      const legendData = [
        { label: 'Value Money', color: 'lightblue' },
        { label: 'Contrast Money', color: 'lightgreen' },
        // Add more entries for each element you want to represent in the legend
      ];

      // Calculate the positions for the legend items
      const legendX = configGraph.marginRight; // Adjust the X position as needed
      const legendY = configGraph.marginTop + 20; // Initial Y position for the legend
      const newGroup = legendData.map(
        addLegendToGradient(createNewGroup(graphWrapper), legendX, legendY),
      );
      newGroup.forEach((v) => onHover(v, d3));
      // Append legend items (rectangles and text) based on the legend data
    }),
  );

  amountLine$ = of([
    {
      valueMoney: 0,
      month: '01.01.2021',
      contrastMoney: 0,
    },
    {
      valueMoney: 0.1,
      month: '08.01.2021',
      contrastMoney: 10.2,
    },
    {
      valueMoney: 0.15,
      month: '01.01.2022',
      contrastMoney: 10.3,
    },
    {
      valueMoney: 0.3,
      month: '01.01.2024',
      contrastMoney: 20,
    },
    {
      valueMoney: 0.4,
      month: '01.01.2025',
      contrastMoney: 25.75,
    },
    {
      valueMoney: 0.65,
      month: '01.05.2026',
      contrastMoney: 60,
    },
  ] as Any).pipe(
    tap((data) => {
      const configGraph = {
        marginTop: 10,
        marginRight: 10,
        marginBottom: 20,
        marginLeft: 20,
        color: ['lightgreen', 'lightblue'],
        height: 340,
        width: 600,
        strokeWidth: 3.5,
      };
      const svg = createNewSvg('#line', configGraph, d3);

      const svgWrapper = createNewGroup(svg).attr(
        'transform',
        'translate(20,10)',
      );

      const axisAndLines = createNewGroup(svgWrapper).attr(
        'transform',
        'translate(10, 0)',
      );
      const height = getHeight(svg, configGraph);
      const width = getWidth(svg, configGraph);
      const xScale = createScale(
        d3,
        'time',
        [0, width],
        d3.extent(data, (d: Any) => new Date(d.month)),
      );
      // Creare scală y
      const yDomain = data.reduce(
        (domain: [number, number], d: any) => [
          Math.min(domain[0], d.valueMoney, d.contrastMoney),
          Math.max(domain[1], d.valueMoney, d.contrastMoney),
        ],
        [Infinity, -Infinity],
      );
      const yScales = createScale(d3, 'linear', [height, 0], yDomain);
      const yScale = createScale(
        d3,
        'linear',
        [height, 0],
        [0, d3.max(data, (d: Any) => Math.max(d.valueMoney, d.contrastMoney))],
      );
      // Creare generator de linie pentru valueMoney
      const lineValueMoney = d3
        .line()
        .x((d: any) => xScale(new Date(d.month)))
        .y((d: any) => yScales(d.valueMoney))
        .curve(d3.curveCatmullRom);

      // Creare generator de linie pentru contrastMoney
      const lineContrastValueMoney = d3
        .line()
        .x((d: any) => xScale(new Date(d.month)))
        .y((d: any) => yScales(d.contrastMoney))
        .curve(d3.curveCatmullRom);

      // Creare generator de arie pentru regiunea dintre liniile
      const areaGen = d3
        .area()
        .x((d: any) => xScale(new Date(d.month)))
        .y0((d: any) => yScales(d.valueMoney + 0.02))
        .y1((d: any) =>
          yScales(
            d.contrastMoney === 0
              ? d.contrastMoney
              : d.contrastMoney - 0.3 <= 0
                ? d.contrastMoney
                : (new Date(d.month).getFullYear() -
                    new Date(data[0].month).getFullYear()) /
                    10 +
                  12,
          ),
        )
        .curve(d3.curveCatmullRom);

      // Apelează path-ul de arie pentru regiunea dintre liniile
      const areaPath = appendDLine(
        appendSeriesPath(
          axisAndLines,
          { ...configGraph, strokeWidth: 5.0 },
          'none',
        )
          .data([data])
          .style('fill', '#a7d9e7'), // Setează culoarea de fundal
        areaGen,
      );
      const areaGen1 = d3
        .area()
        .x((d: any) => xScale(new Date(d.month)))
        .y0((d: any) =>
          yScales(
            d.contrastMoney === 0
              ? d.contrastMoney
              : d.contrastMoney - 0.3 <= 0
                ? d.contrastMoney
                : (new Date(d.month).getFullYear() -
                    new Date(data[0].month).getFullYear()) /
                    10 +
                  12,
          ),
        )
        .y1((d: any) => yScales(d.contrastMoney))
        .curve(d3.curveCatmullRom);

      // Apelează path-ul de arie pentru regiunea dintre liniile
      const areaPath1 = appendDLine(
        appendSeriesPath(
          axisAndLines,
          { ...configGraph, strokeWidth: 5.0 },
          'none',
        )
          .data([data])
          .style('fill', '#7bd0e7'), // Setează culoarea de fundal
        areaGen1,
      );
      const areaGenY = d3
        .area()
        .x((d: any) => xScale(new Date(d.month)))
        .y0((d: any) => yScales(0))
        .y1((d: any) =>
          yScales(
            d.contrastMoney <= 0.1
              ? d.contrastMoney
              : d.valueMoney - d.valueMoney / 2 === 0
                ? 0
                : d.valueMoney - d.valueMoney / 2,
          ),
        )
        .curve(d3.curveCatmullRom);

      const areaPathY = appendDLine(
        appendSeriesPath(axisAndLines, configGraph, 'none')
          .data([data])
          .style('fill', 'rgba(252,177,177,0.45)'), // Setează culoarea de fundal
        areaGenY,
      );

      const areaGenY1 = d3
        .area()
        .x((d: any) => xScale(new Date(d.month)))
        .y0((d: any) =>
          yScales(
            d.contrastMoney <= 0.1
              ? d.contrastMoney
              : d.valueMoney - d.valueMoney / 2 === 0
                ? 0
                : d.valueMoney - d.valueMoney / 2,
          ),
        )
        .y1((d: any) => yScales(d.valueMoney - 0.02))
        .curve(d3.curveCatmullRom);

      const areaPathY1 = appendDLine(
        appendSeriesPath(axisAndLines, configGraph, 'none')
          .data([data])
          .style('fill', 'rgba(252,177,177,0.92)'), // Setează culoarea de fundal
        areaGenY1,
      );
      // Apele
      createAxis(d3, xScale, 'bottom', [0, height], axisAndLines, data.length);
      const legendData = [
        { label: 'Value Money', color: 'lightblue' },
        { label: 'Contrast Money', color: 'lightgreen' },
        // Add more entries for each element you want to represent in the legend
      ];
      // Apelează path-ul pentru linia valueMoney
      const valueMoneyPath = appendDLine(
        appendSeriesPath(axisAndLines, configGraph, '#c03b3b')
          .data([data])
          .style('fill', 'none'),
        lineValueMoney,
      );
      // Apelează path-ul pentru linia contrastMoney
      const contrastMoneyPath = appendDLine(
        appendSeriesPath(axisAndLines, configGraph, '#6a71e8')
          .data([data])
          .style('fill', 'none'),
        lineContrastValueMoney,
      );
      // Calculate the positions for the legend items
      const legendX = configGraph.marginRight; // Adjust the X position as needed
      const legendY = configGraph.marginTop + 20; // Initial Y position for the legend
      const newGroup = legendData.map(
        addLegendToGradient(createNewGroup(svgWrapper), legendX, legendY),
      );
      newGroup.forEach((v) => onHover(v, d3));
      appliedOpacity(svg);
    }),
  );

  constructor() {}
}
