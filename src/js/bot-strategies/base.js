export default class BotStrategyBase {
  /**
   * Construct a new bot strategy.
   * @param lower {number} Lower bound for probe location.
   * @param upper {number} Upper bound for probe location.
   * @param treasureWidth {number} Width of the treasure to search for.
   *  If two adjacent probes are closer together than treasureWidth, the treasure must be located
   *  somewhere else.
   */
  constructor(lower, upper, treasureWidth) {
    this.lower = lower;
    this.upper = upper;
    this.treasureWidth = treasureWidth;
  }

  /**
   * Compute the location in [this.lower,this.upper] to probe next. Overwrite in subclasses.
   *
   * @param tangents {[{x:number,value:number,slope:number}]}
   * @param player
   * @param playerIndex {number}
   * @param players {[]}
   * @returns {number}
   */
  getNextProbeLocation(tangents, player, playerIndex, players) {
    return Math.max(this.lower, Math.min(player.x, this.upper));
  }

  clamp(x) {
    return Math.max(this.lower, Math.min(x, this.upper));
  }

  getAdjacentTangentDistance(x, tangents) {
    console.assert(
      this.lower <= x && x <= this.upper,
      `x=${x} out of range [${this.lower},${this.upper}]`
    );

    const positions = tangents
      .filter(t => this.lower <= t.x && t.x < this.upper)
      .reduce((acc, cur) => acc.add(cur.x), new Set())
      .add(this.lower)
      .add(this.upper);
    const sortedPositions = Array.from(positions.values()).sort();

    const rightIndex = sortedPositions.findIndex(p => x <= p);
    const left = sortedPositions[Math.max(0, rightIndex - 1)];
    const right = sortedPositions[rightIndex];

    console.log(sortedPositions, x, rightIndex);

    return right - left;
  }

  getOppositeTangentDistance(tangentX, x, tangents, lowerValue, lowerSlope, upperValue, upperSlope) {
    console.assert(
      this.lower <= x && x <= this.upper,
      `x=${x} out of range [${this.lower},${this.upper}]`
    );
    console.assert(
      this.lower <= tangentX && tangentX <= this.upper,
      `tangentX=${tangentX} out of range [${this.lower},${this.upper}]`
    );

    const lowerTangent = { x: this.lower, value: lowerValue, slope: lowerSlope };
    const upperTangent = { x: this.upper, value: upperValue, slope: upperSlope };

    if (tangentX < x) {
      const rightIndex = tangents.map(t => t.x).findIndex(tx => x <= tx);
      const right = rightIndex === -1 ? upperTangent : tangents[rightIndex];
      return right;
    } else {
      const tangentsRev = [...tangents].reverse();
      const leftIndex = tangentsRev.map(t => t.x).findIndex(tx => tx <= x);
      const left = leftIndex === -1 ? lowerTangent : tangentsRev[leftIndex];
      return left;
    }
  }

  buildTangentPairsInRange(tangents, lowerValue, lowerSlope, upperValue, upperSlope) {
    // Filter out-of-range tangents
    tangents = tangents.filter(t => this.lower <= t.x && t.x <= this.upper);

    // Add sentinel tangents for left and right border
    tangents.unshift({ x: this.lower, value: lowerValue, slope: lowerSlope });
    tangents.push({ x: this.upper, value: upperValue, slope: upperSlope });

    // Build list of pairs of adjacent tangents
    const tangentPairs = Array.from(
      { length: tangents.length - 1 },
      (_, i) => ({ left: tangents[i], right: tangents[i + 1] })
    )

    return tangentPairs;
  }

  findLargestUnknownTerritory(tangents) {
    // Build list of pairs of adjacent tangents and remove pairs that are too close together
    const tangentPairs = this.buildTangentPairsInRange(tangents, 0, 0, 0, 0)
      .filter(pair => pair.right.x - pair.left.x >= this.treasureWidth);

    const largestUnknownTerritory = tangentPairs.reduce(
      (acc, cur) => cur.right.x - cur.left.x > acc.right.x - acc.left.x ? cur : acc
    );

    return largestUnknownTerritory;
  }
}
