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
}
