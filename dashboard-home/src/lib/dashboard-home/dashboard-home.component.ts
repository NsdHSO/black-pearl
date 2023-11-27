import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardHomeService } from '../dashboard-home.service';
import { AccountComponent, forExpand, UtilsService } from 'ngx-synergy';
import { MatButtonModule } from '@angular/material/button';
import { DashboardHomeSkeletonComponent } from './components/skeletons/dashboardHomeSkeleton/dashboardHomeSkeleton.component';
import { EmptyAccountsComponent } from './components/emptyAccounts/emptyAccounts.component';

@Component({
  selector: 'black-pearl-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccountComponent,
    MatButtonModule,
    DashboardHomeSkeletonComponent,
    EmptyAccountsComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [forExpand()],
})
export class DashboardHomeComponent {
  private _dashboardHomeService = inject(DashboardHomeService);
  protected _utilService = inject(UtilsService);
  accounts$ = this._dashboardHomeService.accountWithIconsAndSelected$;

  protected readonly Array = Array;

  sendAccount(index: number) {
    this._dashboardHomeService.setAccount(index);
  }
}
