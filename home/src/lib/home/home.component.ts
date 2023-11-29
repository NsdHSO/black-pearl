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
  template: '<router-outlet />',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
