import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from '@black-pearl/dashboard-home';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'black-pearl-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardHomeComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
