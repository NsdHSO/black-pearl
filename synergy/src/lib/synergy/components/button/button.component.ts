import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { Shadows } from '../../utils';

@Component({
  selector: 'black-pearl-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  text!: string;

  @Input()
  disabled?: Observable<boolean> = of(false);

  @Output()
  marian: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Input()
  class?: unknown = '';

  @Input()
  shadow?: Shadows = 'shadow-x';
  protected readonly event = event;
}
