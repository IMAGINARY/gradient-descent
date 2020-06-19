export default class BotStrategyBase {
  /**
   * Construct a new bot strategy.
   * @param lower {number} Lower bound for probe location.
   * @param upper {number} Upper bound for probe location.
   */
  constructor(lower, upper) {
    this.lower = lower;
    this.upper = upper;
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
}
