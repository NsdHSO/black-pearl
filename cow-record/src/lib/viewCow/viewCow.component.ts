import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'black-pearl-view-cow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewCow.component.html',
  styleUrl: './viewCow.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCowComponent {}
