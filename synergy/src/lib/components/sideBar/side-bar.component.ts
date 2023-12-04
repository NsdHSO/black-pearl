import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SideBarConfig } from '../../utils';

@Component({
  selector: 'black-pearl-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, RouterLinkActive, RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  @Input()
  items?: SideBarConfig[];
}
