import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputTextComponent,
  JumbotronComponent,
} from '@synergy';
import { GlobalCowRecordService } from '../shared/uitl/services/global-cow-record.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GetControlPipe } from '../shared/uitl/pipes/getControl.pipe';
import { map, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'black-pearl-cow-record',
  standalone: true,
  imports: [
    CommonModule,
    JumbotronComponent,
    InputTextComponent,
    ReactiveFormsModule,
    ButtonComponent,
    RouterOutlet,
    RouterLink,
    GetControlPipe,
  ],
  templateUrl: './cow-record.component.html',
  styleUrl: './cow-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CowRecordComponent {
  readonly cowRecordSharedService = inject(GlobalCowRecordService);
  setState$ = this.cowRecordSharedService.state$.pipe(
    map((value) => value.eligibility),
    tap((eligibility) => {
      const rate = (ra: any) => {
        if (ra.rate !== 0 && ra.rate !== '') {
          if (ra.rate || ra.income) {
            return ra.rate || ra.income * 0.2;
          }
        } else {
          return 1;
        }
      };
      const month = eligibility.goal / rate(eligibility);

      this.cowRecordSharedService.whoYouAre.patchValue({
        goal: eligibility.goal,
        month: month,
        rate: rate(eligibility),
      });
    }),
  );

  valueChanges$ = this.cowRecordSharedService.whoYouAre.valueChanges.pipe(
    switchMap((values) =>
      this.cowRecordSharedService.state$.pipe(
        take(1),
        tap((currentState) => {
          const eligibilityCurrent = currentState.eligibility;
          if (values.goal !== eligibilityCurrent.goal) {
            this.cowRecordSharedService.dispatch('goal', values);
          }
          if (values.month !== eligibilityCurrent.month) {
            this.cowRecordSharedService.dispatch('month', values);
          }
          if (values.rate !== eligibilityCurrent.rate) {
            this.cowRecordSharedService.dispatch('rate', values);
          }
        }),
      ),
    ),
  );
}
