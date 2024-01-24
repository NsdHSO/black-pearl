import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, JumbotronComponent } from '@synergy';
import { GlobalCowRecordService } from '../shared/uitl/services/global-cow-record.service';

@Component({
  selector: 'black-pearl-loading-calculation',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, ButtonComponent],
  templateUrl: './loadingCalculation.component.html',
  styleUrl: './loadingCalculation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingCalculationComponent {
  globalCowService = inject(GlobalCowRecordService);
}
