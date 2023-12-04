import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutlineDirective } from '../../directive/outline/outline.directive';
import { AbstractAccessor, FORWARD_REF } from '../../utils';

@Component({
  selector: 'black-pearl-input-text',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './inputText.component.html',
  styleUrls: ['./inputText.component.scss'],
  providers: [FORWARD_REF(InputTextComponent)],
  hostDirectives: [{ directive: OutlineDirective }],
})
export class InputTextComponent extends AbstractAccessor {}
