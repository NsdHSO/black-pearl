import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from 'ngx-synergy';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'black-pearl-empty-accounts',
  standalone: true,
  imports: [CommonModule, JumbotronComponent, MatIconModule],
  templateUrl: './emptyAccounts.component.html',
  styleUrl: './emptyAccounts.component.scss',
})
export class EmptyAccountsComponent {}
