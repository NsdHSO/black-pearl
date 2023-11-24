import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from '../../utils';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { of } from 'rxjs';

@Component({
  selector: 'black-pearl-account',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, MatIconModule, ButtonComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input({ required: true })
  account!: Account;
  protected readonly of = of;
}
