import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from 'ngx-synergy';
import { ProductionMilkType } from './../../../util';

@Component({
  selector: 'black-pearl-card-dashboard',
  standalone: true,
  imports: [CommonModule, JumbotronComponent],
  templateUrl: './cardDashboard.component.html',
  styleUrl: './cardDashboard.component.scss',
})
export class CardDashboardComponent {
  @Input() milkProduction!: ProductionMilkType;
}
