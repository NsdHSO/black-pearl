import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'black-pearl-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss',
})
export class AppointmentComponent implements OnInit {
  ngOnInit(): void {
    const ad = d3
      .select('#d3')
      .append('svg')
      .attr('width', 700)
      .attr('height', 700);
    ad.append('circle')
      .attr('cx', 230)
      .attr('cy', 200)
      .attr('r', 200)
      .attr('fill', 'white');
    ad.append('circle')
      .attr('cx', 200)
      .attr('cy', 200)
      .attr('r', 50)
      .attr('fill', 'blue');

    ad.append('circle')
      .attr('cx', 300)
      .attr('cy', 200)
      .attr('r', 50)
      .attr('fill', 'red');
    ad.append('circle')
      .attr('cx', 300)
      .attr('cy', 200)
      .attr('r', 10)
      .attr('fill', 'yellow');
    ad.append('circle')
      .attr('cx', 370)
      .attr('cy', 200)
      .attr('r', 20)
      .attr('fill', '#7a95ff');

    ad.append('circle')
      .attr('cx', 120)
      .attr('cy', 200)
      .attr('r', 30)
      .attr('fill', 'blue');

    const ads = d3
      .select('#d34')
      .append('svg')
      .attr('width', 700)
      .attr('height', 700);
    ads
      .append('circle')
      .attr('cx', 230)
      .attr('cy', 200)
      .attr('r', 200)
      .attr('fill', 'white');
    ads
      .append('circle')
      .attr('cx', 180)
      .attr('cy', 200)
      .attr('r', 50)
      .attr('fill', '#000000FF');
    ads
      .append('circle')
      .attr('cx', 280)
      .attr('cy', 200)
      .attr('r', 50)
      .attr('fill', '#ef0000');
    ads
      .append('circle')
      .attr('cx', 230)
      .attr('cy', 140)
      .attr('r', 30)
      .attr('fill', '#daeee7');
    const adsa = d3
      .select('#test')
      .append('svg')
      .attr('width', 700)
      .attr('height', 700);
    adsa
      .append('circle')
      .attr('cx', 230)
      .attr('cy', 200)
      .attr('r', 200)
      .attr('fill', 'white');
  }
}
