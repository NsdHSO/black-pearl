import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmmountDataService } from '../util/services/ammount-data.service';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@synergy';
import { of, tap } from 'rxjs';
import * as d3 from 'd3';
import {
  addAMarker,
  addJumbotron,
  Any,
  createNewGroup,
  createNewSvg,
} from '@graph';

@Component({
  selector: 'black-pearl-appointment',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  @Input({ required: true }) range: Any;
  @Input({ required: true }) gradientSettings: Any;

  private _amountService = inject(AmmountDataService);

  amountData$ = this._amountService.amountData$;
  ant$ = of(1).pipe(
    tap((v) => {
      const margin = { top: 0, bottom: 30, left: 30, right: 20 };

      const svg = createNewSvg('#gradient', '100%', '100%', d3);

      const gradientAndXAxis = createNewGroup(svg);
      gradientAndXAxis.attr('transform', `translate(0, 30)`); // Ajustare pentru poziționare]
      const gradient = gradientAndXAxis
        .append('defs')
        .append('linearGradient')
        .attr('id', 'bar-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      this.gradientSettings.forEach((setting: Any) => {
        gradient
          .append('stop')
          .attr('offset', setting.offset)
          .attr('stop-color', setting.stopColor);
      });
      gradientAndXAxis
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', '100%')
        .attr('height', 10)
        .transition() // Apply transition effect
        .duration(500)
        .style('fill', 'url(#bar-gradient)');

      function updateXAxis(range: Any) {
        const svgWidth = parseFloat(svg.style('width').replace('px', ''));

        const xScale = d3
          .scaleLinear()
          .domain(range)
          .range([0, svgWidth - margin.left]);

        gradientAndXAxis.select('.x-axis').remove();

        const rangeXAxis = d3.axisBottom(xScale).ticks(range[range.length - 1]); // Numărul de bare pe axa x

        const xAxis = createNewGroup(gradientAndXAxis)
          .attr('class', 'x-axis')
          .attr('transform', `translate(10, 10)`)
          .transition()
          .duration(500)
          .call(rangeXAxis);

        xAxis.selectAll('.tick line').remove();
        gradientAndXAxis.select('.marker-group').remove();
        gradientAndXAxis.select('.between-group').remove();
        xAxis
          .selectAll('.tick text')
          .style('fill', 'white')
          .style('font-size', '12px');

        addAMarker(xScale, gradientAndXAxis, 2, 'You are here');

        // Add the text label above the marker

        addJumbotron(xScale, gradientAndXAxis, 3, 'You should be here');
      }

      updateXAxis(this.range);

      // Event pentru redimensionarea ferestrei
      window.addEventListener('resize', updateXAxis.bind(this, this.range));
    }),
  );
}
