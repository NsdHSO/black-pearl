import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {select, Store} from "@ngrx/store";
import {selectHomeState} from "../+state/home.selectors";

@Component({
  selector: 'black-pearl-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  store = inject(Store)

  store$ = this.store.pipe(select(selectHomeState))
}
