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
  ],
  templateUrl: './cow-record.component.html',
  styleUrl: './cow-record.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CowRecordComponent {
  readonly cowRecordSharedService = inject(GlobalCowRecordService);
}
