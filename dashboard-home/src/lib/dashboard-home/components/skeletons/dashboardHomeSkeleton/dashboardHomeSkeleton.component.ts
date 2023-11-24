import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../../../../../../synergy/src/lib/synergy/utils/services';

@Component({
  selector: 'black-pearl-dashboard-home-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboardHomeSkeleton.component.html',
  styleUrls: ['./dashboardHomeSkeleton.component.scss'],
})
export class DashboardHomeSkeletonComponent {
  protected _utilService = inject(UtilsService);
}
