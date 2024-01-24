import { Component, inject, Input, OnDestroy } from '@angular/core';
import {
  ChildrenOutletContexts,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SideBarConfig } from '../../utils';
import { slideInAnimation } from '../../animation/animation';
import { Subject, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'black-pearl-side-bar',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    RouterLinkActive,
    RouterLink,
    AsyncPipe,
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
  animations: [slideInAnimation],
})
export class SideBarComponent implements OnDestroy {
  @Input()
  items?: SideBarConfig[];
  context = '';
  private contexts = inject(ChildrenOutletContexts);
  private _destroyed = new Subject();
  constructor() {
    inject(Router)
      .events.pipe(
        tap(() => this.getRouteAnimationData()),
        takeUntil(this._destroyed),
      )
      .subscribe();
  }

  getRouteAnimationData() {
    this.context =
      this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  ngOnDestroy(): void {
    this._destroyed.next(true);
    this._destroyed.complete();
  }
}
