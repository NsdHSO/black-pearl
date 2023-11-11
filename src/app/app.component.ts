import {Component, signal} from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputTextComponent } from 'ngx-synergy';
import {
  FormControl,
  FormGroup, FormsModule,
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
    FormsModule,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  addess = signal('tet');

  title = 'black-pearl';
  addressGroup = new FormGroup({
    address1: new FormControl('EST2'),
  });
  protected readonly FormControl = FormControl;
  get nativee() {
    return this.addressGroup.get('address1') as FormControl;
  }
  ivan ='tst'
  change(event: any) {
    this.addess.set(event?.target?.value??'');
  }
}
