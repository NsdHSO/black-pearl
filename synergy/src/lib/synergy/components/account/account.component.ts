import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account } from '../../utils';
import { JumbotronComponent } from '../jumbotron/jumbotron.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'black-pearl-account',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, MatIconModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  @Input({ required: true })
  account!: Account;
}
