import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forExpand, UtilsService } from 'ngx-synergy';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'black-pearl-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [forExpand()],
})
export class DashboardHomeComponent {
  protected _utilService = inject(UtilsService);
}
