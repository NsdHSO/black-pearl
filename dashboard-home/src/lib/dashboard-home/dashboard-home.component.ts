import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSearchField, setSearchValue } from '@black-pearl/home';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'black-pearl-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {
  store = inject(Store);

  search$ = this.store.select(selectSearchField);
  protected readonly setSearchValue = setSearchValue;
}
