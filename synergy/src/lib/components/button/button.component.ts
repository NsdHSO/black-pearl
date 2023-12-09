import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Shadows } from '../../utils';

@Component({
  selector: 'black-pearl-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [AsyncPipe, NgClass],
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
