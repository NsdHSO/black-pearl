import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, ButtonComponent } from '@synergy';
import { CardDashboardComponent } from '../components/cardDashboard/cardDashboard.component';
import { CowService, ProductionMilkOnWeekService } from '../util';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'black-pearl-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbComponent,
    CardDashboardComponent,
    ButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  static id = 4;
  private productionMilkOnWeekService = inject(ProductionMilkOnWeekService);
  private _cowService = inject(CowService);

  production = toSignal(this.productionMilkOnWeekService.getProductionMilk$);
  cows2 = this._cowService.cowItems;
  addNew = new Subject();
  newCow = this.addNew.pipe(
    switchMap((t) => this._cowService.addNewCow({ name: 'MArgaret' }))
  );
}
