import { Any } from '@graph';
import * as d3 from 'd3';

export function onHover(parentGroup: Any) {
  parentGroup.on('mouseover', (event: Any) =>
    d3.select(event.currentTarget).attr('transform', 'translate(10,-1)'),
  );
  parentGroup.on('mouseout', (event: Any) =>
    d3.select(event.currentTarget).attr('transform', 'translate(10,0)'),
  );
}
