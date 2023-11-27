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

    transition('void => *', [
      style({ transform: 'scaleY(0.5)', opacity: 0.5 }),
      animate(205),
    ]),

    transition(
      '* => void',
      animate(200, style({ height: 0, transform: 'scaleY(0)', opacity: 0 })),
    ),
  ]);
}
