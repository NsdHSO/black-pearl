import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmmountDataService } from '../util/services/ammount-data.service';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@synergy';
import { of, tap } from 'rxjs';
import * as d3 from 'd3';
import {
  addAMarkerWithLine,
  addJumbotron,
  Any,
  createDefForGradient,
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
      createDefForGradient(
        gradientAndXAxis,
        'bar-gradient',
        this.gradientSettings,
      );
      function updateXAxis(
        range: Any,
        svg: Any,
        gradientAndXAxis: Any,
        d3: Any,
      ) {
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
        gradientAndXAxis.selectAll('.marker-group').remove();
        gradientAndXAxis.selectAll('.between-group').remove();
        xAxis
          .selectAll('.tick text')
          .style('fill', 'white')
          .style('font-size', '12px');

        addAMarkerWithLine(xScale, gradientAndXAxis, 2, -17, 'You are here');

        addJumbotron(xScale, gradientAndXAxis, 3, 'You should be here', -30);
      }

      updateXAxis(this.range, svg, gradientAndXAxis, d3);

      // Event pentru redimensionarea ferestrei
      window.addEventListener(
        'resize',
        updateXAxis.bind(this, this.range, svg, gradientAndXAxis, d3),
      );
    }),
  );
}
