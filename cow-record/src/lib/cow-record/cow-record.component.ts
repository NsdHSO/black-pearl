import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
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

  money = signal(1);
  rate = signal(1);
  month = computed(() => this.money() / this.rate());
}
