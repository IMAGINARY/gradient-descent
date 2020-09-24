import BotStrategyBase from './base';

const INITIAL_ALPHA = 1.0 / Math.pow(2, 7);
const SIGMA = 0.5;
const RHO = 0.5;
const LOCAL_MIN_SLOPE = 0.2;

/**
 * This is a backtracking gradient descent strategy using the Armijo step size condition.
 */
export default class BotStrategyGradientDescent extends BotStrategyBase {

  constructor(lower, upper, treasureWidth) {
    super(lower, upper, treasureWidth);
    this.gda = null;
    this.lastTarget = null;
    this.locations = new Set();
  }

  /**
   * Return next probe location based on gradient descent.
   *
   * @param tangents {[{x:number,value:number,slope:number}]}
   * @param player
   * @param playerIndex {number}
   * @param players {[]}
   * @returns {number}
   */
  getNextProbeLocation(tangents, player, playerIndex, players) {
    let x;
    if (this.lastTarget === null) {
      // There is no last target -> probe at the current location
      x = player.x;
    } else {
      // There is a last target
      const lastTargetTangent = tangents.find(t => t.x === this.lastTarget) || null;
      if (lastTargetTangent === null) {
        // The player didn't probe at the last target yet -> send the player there again
        x = this.lastTarget;
      } else {
        // There is a tangent for the last target -> continue from there
        try {
          // Try to do a local step
          x = this.getNextProbeLocationLocal(lastTargetTangent, tangents);
        } catch (e) {
          console.log('BotStrategyGradientDescent', e.message);
          // Local step failed -> do a global step
          x = this.getNextProbeLocationGlobal(tangents);
        }
      }
    }

    this.locations.add(x);
    this.lastTarget = x;
    return x;
  }

  getNextProbeLocationLocal(currentTangent, tangents) {
    console.log('BotStrategyGradientDescent', 'Local step with ', currentTangent);

    if (Math.abs(currentTangent.slope) < LOCAL_MIN_SLOPE) {
      throw new Error('Local minimum reached');
    }

    if (this.gda === null) {
      this.locations.add(currentTangent.x);
      this.gda = new GradientDescentArmijo();
    }

    let x;
    do {
      x = this.clamp(this.gda.step(currentTangent));
      // TODO: Do not look for the adjacent tangents but for the last Armijo tangents and the
      // TODO: tangent on the opposite side of x
      // NOTE: This doesn't care about overshooting. Even though it could easily be prevented,
      // the regular gradient descent algorithm doesn't do it so we don't do it either
      const oppositeTangent = this.getOppositeTangentDistance(
        this.gda.lastArmijoTangent.x,
        x,
        tangents
      );
      const oppositeTangentDistance = Math.abs(this.gda.lastArmijoTangent.x - oppositeTangent.x);
      const localMinimumInBetween = this.gda.lastArmijoTangent.slope * oppositeTangent.slope < 0;
      const tooNarrow = oppositeTangentDistance < this.treasureWidth;
      console.log(
        "oppositeTangentDistance", oppositeTangentDistance,
        "tooNarrow", tooNarrow
      );
      if (x === this.gda.lastArmijoTangent.x || (localMinimumInBetween && tooNarrow)) {
        // No useful progress possible -> do global search step
        throw new Error('No local progress possible');
      }
    }
    while (this.locations.has(x)); // don't probe the same position twice

    return x;
  }

  getNextProbeLocationGlobal(tangents) {
    console.log('BotStrategyGradientDescent', 'Global step');

    try {
      // Try to find a tangent that we didn't use so far and that's above all currently known local maxima

      const bestLocalMaximum = tangents
        .filter(t => Math.abs(t.slope) < LOCAL_MIN_SLOPE)
        .reduce((acc, cur) => cur.value > acc.value ? cur : acc, 0);
      const unknownTangentsEqualGreaterLocalMaximum = tangents
        .filter(t => t.value >= bestLocalMaximum && !this.locations.has(t.x));
      const bestTangentReducer = (acc, cur) => acc.value > cur.value ? acc : cur;

      // The following will throw an error if the array is empty -> continue with catch-clause.
      const bestTangent = unknownTangentsEqualGreaterLocalMaximum.reduce(bestTangentReducer);

      // We didn't probe at that location ourselves, but we can assume we did
      this.locations.add(bestTangent.x);

      // Start a local search from the new starting point
      this.gda = null;
      return this.getNextProbeLocationLocal(bestTangent)
    } catch (e) {
      // Jump to the mid point of the largest unknown territory
      this.gda = null;
      const largestUnknownTerritory = this.findLargestUnknownTerritory(tangents);
      return (largestUnknownTerritory.left.x + largestUnknownTerritory.right.x) / 2;
    }
  }
}

class GradientDescentArmijo {
  constructor() {
    this.lastArmijoTangent = null;
    this.alpha = INITIAL_ALPHA;
  }

  step(tangent) {
    if (!this.lastArmijoTangent) {
      this.lastArmijoTangent = tangent;
      this.alpha = INITIAL_ALPHA;
    }

    const armijo = tangent.value > this.lastArmijoTangent.value
      + this.alpha * SIGMA * Math.abs(this.lastArmijoTangent.slope);
    if (armijo) {
      this.lastArmijoTangent = tangent;
      this.alpha = INITIAL_ALPHA;
      return this.step(tangent);
    } else {
      const x = this.lastArmijoTangent.x + this.alpha * this.lastArmijoTangent.slope;
      console.log('alpha', this.alpha, 't', tangent, 'x', x);
      this.alpha *= RHO;
      return x;
    }
  }
}
