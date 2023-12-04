import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Shadows } from '../../utils/types/shadow';

@Component({
  selector: 'black-pearl-jumbotron',
  standalone: true,
  imports: [NgClass],
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss'],
})
export class JumbotronComponent {
  @Input()
  shadow: Shadows = 'shadow-xs';

  @Input()
  margin: string = 'm-0';

  @Input()
  padding: string = 'p-0';
}
