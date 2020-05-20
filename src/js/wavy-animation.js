/**
 * Setup a wave-like animation for an svg.js shape made up of polygons.
 *
 * This animation works by applying a transformation on all points of
 * all polygons of the passed shape. The points will move on a sine wave
 * that is continuously phase shifting and whose amplitude decreases over time.
 *
 * Returns a stepping function that takes a delta in milliseconds which should
 * be called on the frame rendering function.
 *
 * Options:
 * - xAmplitude: Maximum distance that the x coordinates are shifted from their
 *   starting position.
 * - duration: Duration of the animation
 * - cycles: Number of cycles of phase shifting.
 *
 * @param {SVG.Container} shape
 *  The shape whose polygons will be animated
 * @param {Object} userOptions
 *  Options (see above)
 * @return {function(...[*]=)}
 *  Returns an animation callback that takes a delta.
 */
export default function WavyAnimation(shape, userOptions = {}) {
  const defaultOptions = {
    xAmplitude: 50,
    duration: 5000,
    cycles: 3,
  };

  const options = Object.assign({}, defaultOptions, userOptions);
  const polygons = shape.find('polygon');
  const originalPlots = polygons.map(p => p.plot());
  const maxY = Math.max(...originalPlots.flat().map(([, y]) => y));

  let counter = 0;

  return (delta, ts) => {
    if (counter > options.duration) {
      return;
    }
    counter += delta;
    const progress = Math.min(counter, options.duration) / options.duration;
    polygons.forEach((p, i) => {
      p.plot(originalPlots[i].map(([x, y]) => (
        [
          x + Math.sin((y / maxY + progress * options.cycles) * Math.PI * 2)
          * options.xAmplitude * (1 - (progress ** 2)),
          y,
        ]
      )));
    });
  };
}
