import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextComponent } from 'ngx-synergy';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    InputTextComponent,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe,
    JsonPipe,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'black-pearl';
  addressGroup = new FormGroup({
    addess1: new FormControl(
        "EST2"
    ),
    addess2: new FormControl('test24'),
  });
}
