import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from '../../utils';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';

@Component({
  selector: 'black-pearl-account',
  standalone: true,
  imports: [CommonModule, JumbotronComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input({ required: true })
  account!: Account;
}
