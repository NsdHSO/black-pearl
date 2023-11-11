import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[blackPearlOutline]',
  standalone: true,
  providers: [],
})
export class OutlineDirective implements OnDestroy {
  /**
   * {Subject} The destroy Subject
   * @private
   */
  private destroy$ = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
