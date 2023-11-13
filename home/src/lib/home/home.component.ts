import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardHomeComponent } from '@black-pearl/dashboard-home';

@Component({
  selector: 'black-pearl-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DashboardHomeComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {}
