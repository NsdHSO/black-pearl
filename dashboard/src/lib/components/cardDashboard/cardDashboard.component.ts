import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent, UtilsService } from '@synergy';
import { KeysPipe } from '../../util';

@Component({
  selector: 'black-pearl-card-dashboard',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, KeysPipe],
  templateUrl: './cardDashboard.component.html',
  styleUrl: './cardDashboard.component.scss',
})
export class CardDashboardComponent {
  //eslint-disable-next-line
  @Input() milkProduction!: any;
  protected _utilService = inject(UtilsService);
}
