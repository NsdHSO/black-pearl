import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from '../../utils';

@Component({
  selector: 'black-pearl-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input({ required: true })
  account!: Account;
}
