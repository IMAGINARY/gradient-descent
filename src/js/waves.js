// The water surface consists of superimposed sin waves that are moving with respect to ts.
// Fixing x, the frequency factors with respect to ts are [1,-1,2,3].
// Since the lowest common denominator of these factors is 6 and the base frequency is 1 / (2 * PI),
// the period of the water animation is 6 / (1 / (2 * PI)) = 12 * PI.
const PERIOD = 12 * Math.PI;

export function height(x, t) {
  t = (t * PERIOD) % PERIOD;
  return (
    Math.sin(x * 100 + t)
    + Math.sin(x * 50 - 1 * t)
    + Math.sin(x * 30 + 2 * t)
    + Math.sin(x * 10 - 3 * t)
  ) / 4;
}

export function slope(x, t) {
  t = (t * PERIOD) % PERIOD;
  return (
    100 * Math.cos(100 * x + t)
    + 50 * Math.cos(50 * x - t)
    + 30 * Math.cos(30 * x + 2 * t)
    + 10 * Math.cos(10 * x - 3 * t)
  ) / 4;
}

export function heights(arr, t, xScale = 1.0, yScale = 1.0) {
  arr.forEach((_, i) => arr[i] = height(i / (arr.length - 1), t));
  return arr;
}

export function points(arr, t, xScale = 1.0, yScale = 1.0) {
  arr.forEach((_, i) => {
    const x = i / (arr.length - 1);
    arr[i] = [xScale * x, yScale * height(x, t)];
  });
  return arr;
}
