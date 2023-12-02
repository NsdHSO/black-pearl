import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forExpand, UtilsService } from 'ngx-synergy';
import { MatButtonModule } from '@angular/material/button';
import { CardDashboardComponent } from './components/cardDashboard/cardDashboard.component';
import { ProductionMilkOnWeekService } from '../services';
import { Store } from '@ngrx/store';
import { initDashboard, selectAllDashboard } from '@black-pearl/home';

@Component({
  selector: 'black-pearl-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, CardDashboardComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [forExpand()],
})
export class DashboardHomeComponent implements OnInit {
  ngOnInit(): void {
    this._store.dispatch(initDashboard());
  }
  protected _utilService = inject(UtilsService);
  private _productionMilk = inject(ProductionMilkOnWeekService);
  private _store = inject(Store);

  getProductionMilk$ = this._productionMilk.getProductionMilk$;
  getDiet$ = this._store.select(selectAllDashboard);
}
