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
  createAxis,
  createNewGroup,
  createNewSvg,
  createScale,
  onHover,
  stackedSeries,
} from '@graph';
import * as d3 from 'd3';

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
          month: '01.01.2023',
          contrastMoney: 0,
        },
        {
          valueMoney: 2,
          month: '02.01.2023',
          contrastMoney: 2,
        },
        {
          valueMoney: 8,
          month: '04.01.2023',
          contrastMoney: 5,
        },
        {
          valueMoney: 17,
          month: '05.05.2023',
          contrastMoney: 6,
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

      const width =
        svgWrapper.attr('width') -
        configGraph.marginLeft -
        configGraph.marginRight -
        configGraph.strokeWidth * 2;
      const height =
        svgWrapper.attr('height') -
        configGraph.marginTop -
        configGraph.marginBottom;
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
        appendSeriesPath(series, configGraph),
        (d: Any) => area(d),
      );

      const middleAxis = createAxis(
        d3,
        xScale,
        'bottom',
        [0, height + 10],
        graphWrapper,
        data.length,
      );

      const markerDate = new Date('04.01.2023');
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
        { label: 'Value Money', color: '#f8f2f6' },
        { label: 'Contrast Money', color: '#aec9f8' },
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

  constructor() {}
}
