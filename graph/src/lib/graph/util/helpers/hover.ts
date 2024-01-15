import { Any } from '@graph';
import * as d3 from 'd3';

export function onHover(parentGroup: Any, d3Instance: typeof d3) {
  const firstTranslate = parentGroup.attr('transform');
  parentGroup.on('mouseover', (event: Any) =>
    d3Instance
      .select(event.currentTarget)
      .attr('transform', 'translate(10,-1)'),
  );
  parentGroup.on('mouseout', (event: Any) =>
    d3Instance.select(event.currentTarget).attr('transform', firstTranslate),
  );
}
