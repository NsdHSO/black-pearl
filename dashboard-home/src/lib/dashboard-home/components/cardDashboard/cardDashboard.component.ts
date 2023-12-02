import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from 'ngx-synergy';

@Component({
  selector: 'black-pearl-card-dashboard',
  standalone: true,
  imports: [CommonModule, JumbotronComponent],
  templateUrl: './cardDashboard.component.html',
  styleUrl: './cardDashboard.component.scss',
})
export class CardDashboardComponent {}
