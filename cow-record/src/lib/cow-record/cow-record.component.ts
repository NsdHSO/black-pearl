import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  InputTextComponent,
  JumbotronComponent,
} from '@synergy';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GetControlPipe } from '../shared/uitl/pipes/getControl.pipe';
import { GlobalCowRecordService } from '../shared/uitl/services/global-cow-record.service';
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
    tap((eligibility) => {}),
  );

  valueChanges$ = this.cowRecordSharedService.whoYouAre.valueChanges.pipe(
    switchMap((values) =>
      this.cowRecordSharedService.state$.pipe(
        take(1),
        tap((currentState) => {
          const eligibilityCurrent = currentState.eligibility;
          const valueChanges = { ...values };
          if (valueChanges.goal !== eligibilityCurrent.goal) {
            valueChanges.month = Math.trunc(
              valueChanges.goal / (eligibilityCurrent.income * 0.2),
            );
            valueChanges.rate = Math.trunc(
              valueChanges.goal / valueChanges.month,
            );
            this.cowRecordSharedService.dispatch('goal', valueChanges);
          }
          if (valueChanges.month !== eligibilityCurrent.month) {
            valueChanges.rate = Math.trunc(
              valueChanges.goal / valueChanges.month,
            );
            this.cowRecordSharedService.dispatch('month', valueChanges);
          }
          if (valueChanges.rate !== eligibilityCurrent.rate) {
            valueChanges.month =
              Math.trunc(+valueChanges.goal / valueChanges.rate) === 0
                ? 1
                : Math.trunc(+valueChanges.goal / valueChanges.rate);
            this.cowRecordSharedService.dispatch('rate', valueChanges);
          }
        }),
      ),
    ),
  );

  // employee income
  income = 2500;

  //BS want when initial 5 * income
  money = signal(this.income * 5);
  //BS want when initial 60% from income
  rate = signal(Math.trunc(this.money() / (this.income * 0.6)));
  //BS want when initial money / rate
  month = signal(Math.trunc(this.money() / +this.rate()));

  constructor() {
    effect(() => {
      this.money();
      console.log('money');
    });
    effect(() => {
      this.rate();
      console.log('rate');
    });
  }
}
