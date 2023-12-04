import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { JumbotronComponent } from '../../synergy/src';

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe, JsonPipe, JumbotronComponent],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
