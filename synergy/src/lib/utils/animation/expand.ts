import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export function forExpand() {
  return trigger('animate', [
    state('*', style({ transform: 'scaleY(1)', opacity: 1 })),

    transition('* <=> *', [
      style({ transform: 'scaleY(0.1)', opacity: 0.2 }),
      animate(205),
    ]),
  ]);
}
