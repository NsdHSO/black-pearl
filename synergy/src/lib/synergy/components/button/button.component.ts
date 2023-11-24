import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { Observable } from 'rxjs';
import { Shadows } from '../../utils/types/shadow';

@Component({
  selector: 'black-pearl-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRippleModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input({ required: true })
  text!: string;

  @Input({ required: true })
  disabled?: Observable<boolean>;

  @Output()
  marian: EventEmitter<unknown> = new EventEmitter<unknown>();

  @Input()
  class?: string = '';

  @Input()
  shadow?: Shadows = 'shadow-x';
}
