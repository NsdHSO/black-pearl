import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmmountDataService } from '../util/services/ammount-data.service';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@synergy';
import { of, tap } from 'rxjs';
import * as d3 from 'd3';
import { createNewGroup, createNewSvg } from '@graph';

@Component({
  selector: 'black-pearl-appointment',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent {
  private _amountService = inject(AmmountDataService);

  amountData$ = this._amountService.amountData$;
  ant$ = of(1).pipe(
    tap((v) => {
      const width = 600;
      const height = 420;
      const margin = { top: 0, bottom: 30, left: 30, right: 20 };

      const svg = createNewSvg('#gradient', '100%', '100%', d3);
      const gradientAndXAxis = createNewGroup(svg);
      const gradient = gradientAndXAxis
        .append('defs')
        .append('linearGradient')
        .attr('id', 'bar-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');

      gradient
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', '#FA7842');
      gradient
        .append('stop')
        .attr('offset', '11%')
        .attr('stop-color', '#FEC73C');
      gradient
        .append('stop')
        .attr('offset', '26%')
        .attr('stop-color', '#FFDF3A');
      gradient
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', 'green');
      gradientAndXAxis
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', '100%')
        .attr('height', 10)
        .style('fill', 'url(#bar-gradient)');

      const xScale = d3
        .scaleLinear()
        .domain([1, 5]) // Assuming the domain ranges from 1 to 5
        .range([margin.left, width - margin.right]); // Adjust according to your chart's margins

      // Create an x-axis using the xScale
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(5) // Set the number of ticks as needed
        .tickFormat(d3.format('d')); // Format the tick labels as integers

      // Append the x-axis to your SVG
      function updateXAxis() {
        const svgWidth = parseFloat(svg.style('width').replace('px', '')); // Lățimea SVG-ului

        // Actualizarea scalei pentru axa x
        const xScale = d3
          .scaleLinear()
          .domain([1, 5]) // Intervalul sau domeniul barelor tale
          .range([0, svgWidth - margin.left]); // Ajustarea la dimensiunea SVG-ului

        // Șterge bara de pe axa x existentă (dacă există deja)
        gradientAndXAxis.select('.x-axis').remove();

        // Adăugarea barelor pentru axa x actualizată
        const xAxis = d3.axisBottom(xScale).ticks(5); // Numărul de bare pe axa x

        const xAxiss = gradientAndXAxis
          .append('g')
          .attr('class', 'x-axis')
          .attr('transform', `translate(10, 10)`) // Ajustare pentru poziționare
          .call(xAxis);

        // Stilizare bare axă x
        xAxiss.selectAll('.tick line').remove(); // Ascunde liniile de marcaj

        xAxiss
          .selectAll('.tick text')
          .style('fill', 'white')
          .style('font-size', '12px'); // Stilizare text
      }

      // Apelarea funcției pentru a inițializa barele pe axa x
      updateXAxis();

      // Event pentru redimensionarea ferestrei
      window.addEventListener('resize', updateXAxis);
    }),
  );
}
