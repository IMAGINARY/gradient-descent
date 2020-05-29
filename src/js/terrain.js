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
    index: Math.floor(length * Math.random()),
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

function generateTerrainPoints(numPoints, marginWidth = 0.1, marginHeight = 0.2, jitter = 0.25) {
  const heights = new Float32Array(numPoints);
  const marginIndices = [
    Math.floor(marginWidth * numPoints),
    Math.floor(marginWidth + (1 - 2 * marginWidth) * numPoints),
  ];
  const predefinedHeights = [
    [0, Math.random() * marginHeight],
    [marginIndices[0], marginHeight],
    [marginIndices[0] + 1 + Math.floor(Math.random() * (marginIndices[1] - marginIndices[0])),
     1.0],
    [marginIndices[1], marginHeight],
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

const defaultOptions = {
  marginWidth: 0.1,
  marginHeight: 0.1,
  jitter: 0.25,
  smoothing: 6,
};

export default function terrain(numSamples, length, options = {}) {
  options = Object.assign({}, defaultOptions, options);
  const roughTerrainPoints = generateTerrainPoints(
    numSamples,
    options.marginWidth,
    options.marginHeight,
    options.jitter
  );
  const smoothTerrainPoints = smoothChaikin(roughTerrainPoints, options.smoothing);
  const smoothTerrainHeights = convertPointsToHeights(smoothTerrainPoints, length);
  return smoothTerrainHeights;
}
