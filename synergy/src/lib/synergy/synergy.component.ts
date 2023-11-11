import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'black-pearl-synergy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './synergy.component.html',
  styleUrls: ['./synergy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SynergyComponent {}
