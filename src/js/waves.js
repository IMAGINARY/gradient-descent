export function height(x, ts) {
  ts = ts / 500;
  return (
    Math.sin(x * 100 + ts)
    + Math.sin(x * 50 - 1 * ts)
    + Math.sin(x * 30 + 2 * ts)
    + Math.sin(x * 10 - 3 * ts)
  ) / 4;
}

export function slope(x, ts) {
  ts = ts / 500;
  return (
    100 * Math.cos(100 * x + ts)
    + 50 * Math.cos(50 * x - ts)
    + 30 * Math.cos(30 * x + 2 * ts)
    + 10 * Math.cos(10 * x - 3 * ts)
  ) / 4;
}

export function heights(arr, ts) {
  arr.forEach((_, i) => arr[i] = height(i / (arr.length - 1), ts))
  return arr;
}

export function points(arr, ts) {
  arr.forEach((_, i) => {
    const x = i / (arr.length - 1);
    arr[i] = [x, height(x, ts)];
  });
  return arr;
}
