//eslint-disable-next-line
export let height: unknown = function <T>(this: any, _value: T) {
  if (!arguments.length) {
    return height;
  }

  height = _value;
  return this;
};
