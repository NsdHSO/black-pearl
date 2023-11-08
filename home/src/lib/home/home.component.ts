import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'black-pearl-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  store = inject(Store);

  name = new FormControl('test');
}
