import BotStrategyBase from './base';

export default class BotStrategyTangentIntersection extends BotStrategyBase {
  /**
   * TODO: Document
   *
   * @param tangents {[{x:number,value:number,slope:number}]}
   * @param player
   * @param playerIndex {number}
   * @param players {[]}
   * @returns {number}
   */
  getNextProbeLocation(tangents, player, playerIndex, players) {
    // Build list of pairs of adjacent tangents and remove pairs that are too close together
    const tangentPairs = this.buildTangentPairsInRange(tangents, 0, 0.5, 0, -0.5)
      .filter(pair => pair.right.x - pair.left.x >= this.treasureWidth);

    // Compute a new weighted point for each pair of tangents
    const inBetweenPoints = tangentPairs.map(pair => computePointBetweenTangents(
      pair.left,
      pair.right,
      this.treasureWidth / 2
    ));

    // Choose the one with the highest weight
    const newX = inBetweenPoints.reduce((acc, cur) => acc.weight > cur.weight ? acc : cur).x;

    return newX;
  }
}

function computePointBetweenTangents(left, right, margin) {
  const intersectionPoint = intersectTangents(left, right);
  const midPoint = {
    x: (left.x + right.x) / 2,
    y: (left.value + right.value) / 2,
  };
  const leftAtCenter = {
    x: midPoint.x,
    y: left.value + left.slope * (right.x - left.x),
  }
  const rightAtCenter = {
    x: midPoint.x,
    y: right.value - right.slope * (right.x - left.x),
  }

  const all = [intersectionPoint, midPoint, leftAtCenter, rightAtCenter];
  const best = all.filter(p => p !== null)
    .map(p => Object.assign(p, { weight: weighIntersection(left, right, p, margin) }))
    .reduce((acc, cur) => acc.weight > cur.weight ? acc : cur);

  // Make sure the new x is far away from both ends
  const minX = left.x + margin;
  const maxX = right.x - margin;
  best.x = Math.max(minX, Math.min(best.x, maxX));

  return best;
}

function weighIntersection(left, right, intersection, margin) {
  if (left.value <= intersection.y && right.value <= intersection.y) {
    // high weight if intersection point probably improves upon its endpoints
    return 1 + intersection.y;
  } else {
    return intersection.y * (right.x - left.x - 2 * margin);
  }
}

function intersectTangents(left, right) {
  const pl = { x: left.x, y: left.value };
  const vl = { x: 1, y: left.slope };
  const pr = { x: right.x, y: right.value };
  const vr = { x: -1, y: -right.slope };
  const ll = { start: pl, end: add(pl, vl) };
  const lr = { start: pr, end: add(pr, vr) };
  const p = intersectLines(ll, lr);
  const inInterval = p !== null // the two lines intersect
    && left.x < p.x && p.x < right.x; // intersection point is in between the two endpoints
  return inInterval ? p : null;
}

function add(p, v) {
  return { x: p.x + v.x, y: p.y + v.y }
}

function intersectLines(l1, l2) {
  const d1x = l1.end.x - l1.start.x;
  const d1y = l1.end.y - l1.start.y;
  const d2x = l2.end.x - l2.start.x;
  const d2y = l2.end.y - l2.start.y;
  const denominator = (d2y * d1x) - (d2x * d1y);
  if (denominator === 0) {
    return null;
  }

  const d12x = l1.start.x - l2.start.x;
  const d12y = l1.start.y - l2.start.y;
  const numerator = (d2x * d12y) - (d2y * d12x);
  const t = numerator / denominator;

  return {
    x: l1.start.x + t * d1x,
    y: l1.start.y + t * d1y,
  };
}
