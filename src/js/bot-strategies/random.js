import BotStrategyBase from './base';

export default class BotStrategyRandom extends BotStrategyBase {
  /**
   * Return a random next probe location.
   *
   * @param tangents {[{x:number,value:number,slope:number}]}
   * @param player
   * @param playerIndex {number}
   * @param players {[]}
   * @returns {number}
   */
  getNextProbeLocation(tangents, player, playerIndex, players) {
    return this.lower + (this.upper - this.lower) * Math.random();
  }
}
