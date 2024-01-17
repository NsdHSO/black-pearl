import { Any } from './generate';

export function appliedOpacity(parent: Any, ms = 1000) {
  parent.style('opacity', 0).transition().duration(ms).style('opacity', 1);
}
