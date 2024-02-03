import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, JumbotronComponent } from '@synergy';
import { GlobalCowRecordService } from '../shared/uitl/services/global-cow-record.service';
import { FormControl, FormGroup } from '@angular/forms';

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

  cartFrom = new FormGroup(
    {
      price: new FormControl(0),
      procentFromYour: new FormControl(0),
      howMany: new FormControl(0),
    },
    {},
  );
}
