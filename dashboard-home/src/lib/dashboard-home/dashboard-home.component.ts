import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardHomeService } from '../dashboard-home.service';
import { AccountComponent } from 'ngx-synergy';
import { MatButtonModule } from '@angular/material/button';
import { DashboardHomeSkeletonComponent } from './components/skeletons/dashboardHomeSkeleton/dashboardHomeSkeleton.component';

@Component({
  selector: 'black-pearl-dashboard-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AccountComponent,
    MatButtonModule,
    DashboardHomeSkeletonComponent,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {
  private _dashboardHomeService = inject(DashboardHomeService);

  accounts$ = this._dashboardHomeService.accountWithIcons$;
  protected readonly Array = Array;
}
