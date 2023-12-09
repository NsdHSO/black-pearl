import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../synergy/src';
import { CardDashboardComponent } from '../components/cardDashboard/cardDashboard.component';

@Component({
  selector: 'black-pearl-dashboard',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, CardDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  asd = {
    totalCows: 38,
    totalCowsMilked: 12,
    cowsNotMilked: 26,
    totalAmLiters: 929.0,
    totalNoonLiters: 918.0,
    averageLiters: 244.66,
    highestMilkQuality: 800,
    lowestMilkQuantity: 60,
    totalLiters: 29236.0,
    cowWithHighestMilkQuantity: 'Margret Tac54',
  };
}
