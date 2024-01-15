import * as d3 from 'd3';
import { Any } from './generate';

type ScaleType = 'linear' | 'time' | 'ordinal'; // Add more types if needed

export function createScale<T, R extends Iterable<T>, D extends Iterable<Any>>(
  d3Instance: typeof d3,
  type: ScaleType,
  range: R,
  domain: D,
): Any {
  switch (type) {
    case 'linear':
      return d3Instance
        .scaleLinear<T>()
        .range(range)
        .domain(domain) as d3.ScaleLinear<T, T>;
    case 'time':
      return d3Instance
        .scaleTime<T>()
        .range(range)
        .domain(domain) as d3.ScaleTime<T, T>;
    default:
      throw new Error('Invalid scale type');
  }
}
