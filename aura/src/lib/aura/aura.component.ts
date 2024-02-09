import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'black-pearl-aura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aura.component.html',
  styleUrl: './aura.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuraComponent {}
