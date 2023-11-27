import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account, forExpand, UtilsService } from '../../utils';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'black-pearl-account',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, MatIconModule, ButtonComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  animations: [forExpand()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  @Input({ required: true })
  account!: Account;
  protected readonly of = of;

  protected readonly _utilService = inject(UtilsService);
}
