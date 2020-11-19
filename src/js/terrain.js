import assert from 'assert';

// Returns an integer in [l,u)
function randIndex(l, u) {
  assert(Number.isInteger(l) && l >= 0);
  assert(Number.isInteger(u) && u >= 0);
  assert(l < u);

  const r = l + (u - l) * Math.random();
  return Math.max(l, Math.min(Math.floor(r), u - 1));
}

function smoothChaikin(arr, num, open = true) {
  if (num === 0)
    return arr;

  const l = arr.length;
  const smooth = arr.map((c, i) => [
    [0.75 * c[0] + 0.25 * arr[(i + 1) % l][0], 0.75 * c[1] + 0.25 * arr[(i + 1) % l][1]],
    [0.25 * c[0] + 0.75 * arr[(i + 1) % l][0], 0.25 * c[1] + 0.75 * arr[(i + 1) % l][1]]
  ]).flat();

  if (open) {
    smooth.length -= 1;
    smooth[0] = arr[0];
    smooth[smooth.length - 1] = arr[arr.length - 1];
  }

  return smoothChaikin(smooth, num - 1, open);
}

function subdivide(length, leftHeight, rightHeight) {
  return {
    index: randIndex(0, length),
    height: Math.max(leftHeight, rightHeight) * Math.random(),
  };
}

function generateInnerTerrainHeights(heights, leftHeight, rightHeight) {
  if (heights.length > 0) {
    const { index, height } = subdivide(heights.length, leftHeight, rightHeight);
    heights[index] = height;
    generateInnerTerrainHeights(heights.subarray(0, index), leftHeight, height);
    generateInnerTerrainHeights(heights.subarray(index + 1, heights.length),
      height,
      rightHeight);
  }
  return heights;
}

function generateTerrainPoints(numPoints, marginWidth = 0.1, marginHeight = 0.2, jitter = 0.25, tilt = 4) {
  const heights = new Float32Array(numPoints);

  const leftMarginIndex = Math.floor(marginWidth * numPoints);
  const rightMarginIndex = Math.floor((1 - marginWidth) * (numPoints - 1));

  assert(leftMarginIndex + 1 < rightMarginIndex);
  assert(marginHeight >= 0.0 && marginHeight < 1.0);
  const maxHeightIndex = randIndex(leftMarginIndex + 1, rightMarginIndex);
  const r = 1 - Math.pow(Math.random(), tilt); // tendency towards 0 or 1 depending on tilt
  const maxHeight = marginHeight + Math.max(Number.EPSILON, r * (1 - marginHeight));

  const predefinedHeights = [
    [0, Math.random() * marginHeight],
    [leftMarginIndex, marginHeight],
    [maxHeightIndex, maxHeight],
    [rightMarginIndex, marginHeight],
    [numPoints - 1, Math.random() * marginHeight],
  ];

  if (numPoints > 0) {
    predefinedHeights.forEach(([i, h]) => heights[i] = h);
    predefinedHeights.reduce(([i0, h0], [i1, h1]) => {
      generateInnerTerrainHeights(heights.subarray(i0 + 1, i1), h0, h1);
      return [i1, h1];
    });
  }

  // restrict jitter range to prevent points from switching their order
  jitter = Math.max(0.0, Math.min(jitter, 1.0));

  return new Array(heights.length)
    .fill(null)
    .map((_, i) => [
      (i + jitter * (Math.random() - 0.5)) / (heights.length - 1),
      heights[i]
    ]);
}

function convertPointsToHeights(points, numHeights) {
  const left = points[0][0];
  const right = points[points.length - 1][0];
  const width = right - left;
  const heights = Array(numHeights);
  let j = 0;
  for (let i = 0; i < heights.length - 1; ++i) {
    while (i >= (numHeights - 1) * (points[j][0] - left) / width) {
      ++j;
    }
    const t = (left + ((i / (numHeights - 1)) * width) - (points[j - 1][0]))
      / (points[j][0] - points[j - 1][0]);
    heights[i] = points[j - 1][1] + (points[j][1] - points[j - 1][1]) * t;
  }
  heights[heights.length - 1] = points[points.length - 1][1];
  return heights;
}

function restrictPrecision(number, decimalPlaces) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}

const defaultOptions = {
  marginWidth: 0.1,
  marginHeight: 0.1,
  jitter: 0.25,
  tilt: 4,
  smoothing: 6,
};

export default function terrain(numSamples, length, options = {}) {
  options = Object.assign({}, defaultOptions, options);
  const roughTerrainPoints = generateTerrainPoints(
    numSamples,
    options.marginWidth,
    options.marginHeight,
    options.jitter,
    options.tilt,
  );
  const smoothTerrainPoints = smoothChaikin(roughTerrainPoints, options.smoothing);
  const smoothTerrainHeights = convertPointsToHeights(smoothTerrainPoints, length);
  return smoothTerrainHeights.map(n => restrictPrecision(n, 5));
}
