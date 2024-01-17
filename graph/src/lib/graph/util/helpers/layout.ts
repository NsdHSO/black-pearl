import { Any } from './generate';

export function getWidth(parent: Any, configGraph: Any) {
  return (
    parent.attr('width') -
    configGraph.marginLeft -
    configGraph.marginRight -
    configGraph.strokeWidth * 2
  );
}

export function getHeight(svgWrapper: Any, configGraph: Any) {
  return (
    svgWrapper.attr('height') - configGraph.marginTop - configGraph.marginBottom
  );
}
