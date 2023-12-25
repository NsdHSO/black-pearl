let t = 0;
//eslint-disable-next-line
export const clicked = (fn: any) => {
  t++;
  let done = false;
  //eslint-disable-next-line
  return (...args: any) => {
    if (!done) {
      done = true;
      fn(...args);
    } else {
      console.log('elese ');
    }
  };
};
